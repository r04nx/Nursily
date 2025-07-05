-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_type AS ENUM ('patient', 'nurse');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE device_type AS ENUM ('blood_pressure', 'glucose_monitor', 'scale', 'pulse_oximeter');
CREATE TYPE message_type AS ENUM ('text', 'voice', 'system');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    user_type user_type NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patient-specific information
CREATE TABLE public.patients (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    medical_conditions TEXT[],
    allergies TEXT[],
    current_medications JSONB,
    insurance_info JSONB,
    preferred_language TEXT DEFAULT 'English',
    mobility_notes TEXT
);

-- Nurse-specific information
CREATE TABLE public.nurses (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    license_number TEXT UNIQUE NOT NULL,
    years_experience INTEGER,
    hourly_rate DECIMAL(10,2),
    service_radius INTEGER DEFAULT 10,
    bio TEXT,
    languages TEXT[],
    specializations TEXT[],
    certifications TEXT[],
    availability JSONB,
    is_verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0
);

-- Health devices
CREATE TABLE public.health_devices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    device_name TEXT NOT NULL,
    device_model TEXT,
    device_type device_type NOT NULL,
    is_connected BOOLEAN DEFAULT FALSE,
    battery_level INTEGER,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health readings
CREATE TABLE public.health_readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    device_id UUID REFERENCES public.health_devices(id) ON DELETE SET NULL,
    reading_type TEXT NOT NULL,
    value JSONB NOT NULL,
    unit TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT
);

-- Health journal entries
CREATE TABLE public.health_journal (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    entry_type TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    mood TEXT,
    symptoms TEXT[],
    vitals JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments
CREATE TABLE public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    nurse_id UUID REFERENCES public.nurses(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status appointment_status DEFAULT 'pending',
    service_type TEXT NOT NULL,
    location_address TEXT,
    location_coordinates POINT,
    notes TEXT,
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    message_type message_type DEFAULT 'text',
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorite nurses (for patients)
CREATE TABLE public.favorite_nurses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    nurse_id UUID REFERENCES public.nurses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(patient_id, nurse_id)
);

-- Reviews and ratings
CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    nurse_id UUID REFERENCES public.nurses(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(patient_id, nurse_id, appointment_id)
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nurses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_nurses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Patients: Users can only access their own patient data
CREATE POLICY "Patients can view own data" ON public.patients
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Patients can update own data" ON public.patients
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Patients can insert own data" ON public.patients
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Nurses: Users can view all nurses (for finding), but only edit their own
CREATE POLICY "Anyone can view nurses" ON public.nurses
    FOR SELECT USING (true);

CREATE POLICY "Nurses can update own data" ON public.nurses
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Nurses can insert own data" ON public.nurses
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Health devices: Users can only access their own devices
CREATE POLICY "Users can manage own devices" ON public.health_devices
    FOR ALL USING (auth.uid() = user_id);

-- Health readings: Users can only access their own readings
CREATE POLICY "Users can manage own readings" ON public.health_readings
    FOR ALL USING (auth.uid() = user_id);

-- Health journal: Users can only access their own journal
CREATE POLICY "Users can manage own journal" ON public.health_journal
    FOR ALL USING (auth.uid() = user_id);

-- Appointments: Users can see appointments they're involved in
CREATE POLICY "Users can view related appointments" ON public.appointments
    FOR SELECT USING (
        auth.uid() = patient_id OR 
        auth.uid() = nurse_id
    );

CREATE POLICY "Patients can create appointments" ON public.appointments
    FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update related appointments" ON public.appointments
    FOR UPDATE USING (
        auth.uid() = patient_id OR 
        auth.uid() = nurse_id
    );

-- Messages: Users can see messages they sent or received
CREATE POLICY "Users can view own messages" ON public.messages
    FOR SELECT USING (
        auth.uid() = sender_id OR 
        auth.uid() = recipient_id
    );

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update message read status" ON public.messages
    FOR UPDATE USING (auth.uid() = recipient_id);

-- Favorite nurses: Patients can manage their own favorites
CREATE POLICY "Patients can manage favorites" ON public.favorite_nurses
    FOR ALL USING (auth.uid() = patient_id);

-- Reviews: Users can view all reviews, but only create/update their own
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Patients can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = patient_id);

-- Notifications: Users can only see their own notifications
CREATE POLICY "Users can manage own notifications" ON public.notifications
    FOR ALL USING (auth.uid() = user_id);

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, user_type, full_name, email)
    VALUES (NEW.id, 'patient', COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update nurse ratings
CREATE OR REPLACE FUNCTION public.update_nurse_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.nurses 
    SET 
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM public.reviews 
            WHERE nurse_id = NEW.nurse_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE nurse_id = NEW.nurse_id
        )
    WHERE id = NEW.nurse_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for rating updates
CREATE TRIGGER on_review_created
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_nurse_rating();

CREATE TRIGGER on_review_updated
    AFTER UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_nurse_rating();

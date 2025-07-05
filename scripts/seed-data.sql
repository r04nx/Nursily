-- Insert sample nurses
INSERT INTO public.profiles (id, user_type, full_name, email, phone, address) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'nurse', 'Emma Thompson', 'emma.thompson@nursily.com', '+1-555-0101', '123 Healthcare Ave, Springfield, IL'),
('550e8400-e29b-41d4-a716-446655440002', 'nurse', 'Michael Rodriguez', 'michael.rodriguez@nursily.com', '+1-555-0102', '456 Medical St, Springfield, IL'),
('550e8400-e29b-41d4-a716-446655440003', 'nurse', 'Sarah Chen', 'sarah.chen@nursily.com', '+1-555-0103', '789 Wellness Blvd, Springfield, IL'),
('550e8400-e29b-41d4-a716-446655440004', 'nurse', 'David Johnson', 'david.johnson@nursily.com', '+1-555-0104', '321 Care Lane, Springfield, IL');

INSERT INTO public.nurses (id, license_number, years_experience, hourly_rate, bio, languages, specializations, certifications, availability, is_verified, rating, total_reviews) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'RN-123456', 8, 45.00, 'Compassionate registered nurse with 8 years of experience in geriatric care.', ARRAY['English', 'Spanish'], ARRAY['Geriatric Care', 'Diabetes Management'], ARRAY['RN', 'CPR Certified'], '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": false, "sunday": false}', true, 4.9, 127),
('550e8400-e29b-41d4-a716-446655440002', 'RN-234567', 12, 50.00, 'Experienced nurse specializing in post-operative care and wound management.', ARRAY['English'], ARRAY['Post-Op Care', 'Wound Management'], ARRAY['RN', 'Wound Care Certified'], '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": true, "sunday": false}', true, 4.8, 89),
('550e8400-e29b-41d4-a716-446655440003', 'RN-345678', 6, 42.00, 'Dedicated nurse with expertise in medication management and patient education.', ARRAY['English', 'Mandarin'], ARRAY['Medication Management', 'Patient Education'], ARRAY['RN', 'CPR Certified'], '{"monday": true, "tuesday": true, "wednesday": false, "thursday": true, "friday": true, "saturday": false, "sunday": true}', true, 4.7, 156),
('550e8400-e29b-41d4-a716-446655440004', 'RN-456789', 15, 55.00, 'Senior nurse with extensive experience in chronic disease management.', ARRAY['English'], ARRAY['Chronic Disease Management', 'Cardiac Care'], ARRAY['RN', 'ACLS Certified', 'Cardiac Care'], '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": false, "saturday": false, "sunday": false}', true, 4.9, 203);

-- Insert sample health devices
INSERT INTO public.health_devices (user_id, device_name, device_model, device_type, is_connected, battery_level, last_sync) VALUES
(auth.uid(), 'Blood Pressure Monitor', 'Omron HEM-7120', 'blood_pressure', true, 85, NOW() - INTERVAL '2 hours'),
(auth.uid(), 'Smart Scale', 'Withings Body+', 'scale', true, 92, NOW() - INTERVAL '1 hour'),
(auth.uid(), 'Glucose Monitor', 'FreeStyle Libre', 'glucose_monitor', false, 67, NOW() - INTERVAL '1 day'),
(auth.uid(), 'Pulse Oximeter', 'Masimo MightySat', 'pulse_oximeter', true, 78, NOW() - INTERVAL '30 minutes');

-- Insert sample health readings
INSERT INTO public.health_readings (user_id, reading_type, value, unit, recorded_at) VALUES
(auth.uid(), 'blood_pressure', '{"systolic": 120, "diastolic": 80}', 'mmHg', NOW() - INTERVAL '2 hours'),
(auth.uid(), 'heart_rate', '{"bpm": 72}', 'bpm', NOW() - INTERVAL '2 hours'),
(auth.uid(), 'weight', '{"weight": 165.5}', 'lbs', NOW() - INTERVAL '1 day'),
(auth.uid(), 'blood_glucose', '{"glucose": 95}', 'mg/dL', NOW() - INTERVAL '3 hours'),
(auth.uid(), 'oxygen_saturation', '{"spo2": 98}', '%', NOW() - INTERVAL '30 minutes');

-- Insert sample health journal entries
INSERT INTO public.health_journal (user_id, entry_type, title, content, mood, symptoms, vitals) VALUES
(auth.uid(), 'Medication', 'Morning Medications', 'Took Metformin 500mg and Lisinopril 10mg with breakfast. No side effects noticed.', 'Good', ARRAY[]::TEXT[], '{"blood_pressure": "120/80", "heart_rate": "72"}'),
(auth.uid(), 'Symptoms', 'Afternoon Check-in', 'Feeling a bit tired after lunch. Blood sugar seems stable. Took a short walk in the garden.', 'Fair', ARRAY['Fatigue'], '{"blood_sugar": "110 mg/dL"}'),
(auth.uid(), 'Exercise', 'Evening Walk', 'Walked for 20 minutes around the neighborhood. Felt good to get some fresh air and movement.', 'Great', ARRAY[]::TEXT[], '{"steps": "2,340", "heart_rate": "85"}');

-- Insert sample notifications
INSERT INTO public.notifications (user_id, title, body, type, data) VALUES
(auth.uid(), 'Medication Reminder', 'Time to take your evening Lisinopril', 'medication', '{"medication": "Lisinopril", "dosage": "10mg", "time": "8:00 PM"}'),
(auth.uid(), 'Appointment Reminder', 'Your appointment with Emma Thompson is tomorrow at 2:00 PM', 'appointment', '{"nurse_name": "Emma Thompson", "time": "2:00 PM", "date": "tomorrow"}'),
(auth.uid(), 'Health Tip', 'Remember to stay hydrated! Aim for 8 glasses of water today.', 'health_tip', '{"tip_category": "hydration"}');

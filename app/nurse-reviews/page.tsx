"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, TrendingUp, MessageCircle, ThumbsUp, Filter } from "lucide-react"
import Link from "next/link"

const reviewStats = {
  averageRating: 4.9,
  totalReviews: 127,
  fiveStars: 98,
  fourStars: 23,
  threeStars: 4,
  twoStars: 2,
  oneStar: 0,
}

const reviews = [
  {
    id: 1,
    patientName: "Sarah J.",
    patientAvatar: "👵",
    rating: 5,
    date: "2024-03-14",
    comment:
      "Emma is absolutely wonderful! She's so patient and caring. She helped me understand my medications better and always makes me feel comfortable. Highly recommend!",
    service: "Medication Management",
    helpful: 12,
  },
  {
    id: 2,
    patientName: "Robert S.",
    patientAvatar: "👴",
    rating: 5,
    date: "2024-03-12",
    comment:
      "Professional, knowledgeable, and kind. Emma went above and beyond to help with my recovery. She's truly dedicated to her patients' wellbeing.",
    service: "Post-Surgery Care",
    helpful: 8,
  },
  {
    id: 3,
    patientName: "Mary W.",
    patientAvatar: "👵",
    rating: 4,
    date: "2024-03-10",
    comment:
      "Very good nurse with excellent skills. She was punctual and thorough. Only minor issue was that she was running a bit late, but she called ahead to let me know.",
    service: "Home Visit",
    helpful: 5,
  },
  {
    id: 4,
    patientName: "James B.",
    patientAvatar: "👴",
    rating: 5,
    date: "2024-03-08",
    comment:
      "Emma has been helping me manage my diabetes for months now. She's incredibly knowledgeable and has helped me improve my health significantly. Grateful for her care!",
    service: "Diabetes Care",
    helpful: 15,
  },
  {
    id: 5,
    patientName: "Linda D.",
    patientAvatar: "👵",
    rating: 5,
    date: "2024-03-06",
    comment:
      "Compassionate and skilled nurse. She made me feel at ease during a difficult time. Her expertise in wound care is exceptional. Thank you, Emma!",
    service: "Wound Care",
    helpful: 9,
  },
]

export default function NurseReviewsPage() {
  const [filter, setFilter] = useState("All")

  const filteredReviews = reviews.filter((review) => {
    if (filter === "All") return true
    return review.rating === Number.parseInt(filter)
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getPercentage = (count: number) => {
    return ((count / reviewStats.totalReviews) * 100).toFixed(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/nurse-dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Star className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-gray-800">Reviews & Ratings</h1>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Rating Overview */}
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-800 mb-1">{reviewStats.averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {renderStars(Math.floor(reviewStats.averageRating))}
              </div>
              <p className="text-sm text-gray-600">{reviewStats.totalReviews} total reviews</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Excellent rating!</span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewStats[
                  `${stars === 1 ? "one" : stars === 2 ? "two" : stars === 3 ? "three" : stars === 4 ? "four" : "five"}Stars` as keyof typeof reviewStats
                ] as number
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-6">{stars}</span>
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${getPercentage(count)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filter Buttons */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 overflow-x-auto">
              {["All", "5", "4", "3", "2", "1"].map((rating) => (
                <Button
                  key={rating}
                  variant={filter === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(rating)}
                  className={`whitespace-nowrap ${
                    filter === rating ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" : ""
                  }`}
                >
                  {rating === "All" ? "All Reviews" : `${rating} Stars`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{review.patientAvatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{review.patientName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {review.service}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                      <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No reviews found</h3>
              <p className="text-gray-600">No reviews match the selected filter.</p>
            </CardContent>
          </Card>
        )}

        {/* Review Insights */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-3">Review Insights</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Most mentioned quality:</span>
                <span className="font-medium">Compassionate Care</span>
              </div>
              <div className="flex justify-between">
                <span>Response rate to reviews:</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between">
                <span>Average response time:</span>
                <span className="font-medium">&lt; 24 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

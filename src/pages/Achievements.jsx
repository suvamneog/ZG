import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy, Star, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'


const Achievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data for demonstration
  const sampleAchievements = [
    {
      id: 1,
      year: 2006,
      title: 'Filmfare Award Nomination',
      category: 'Best Male Playback Singer',
      description: 'Nominated for "Ya Ali" from Gangster'
    },
    {
      id: 2,
      year: 2008,
      title: 'Assam State Film Award',
      category: 'Best Singer',
      description: 'For contribution to Assamese music'
    },
    {
      id: 3,
      year: 2010,
      title: 'Prag Cine Award',
      category: 'Best Actor',
      description: 'For outstanding performance in Assamese cinema'
    },
    {
      id: 4,
      year: 2015,
      title: 'Lifetime Achievement Award',
      category: 'Music',
      description: 'Recognizing decades of musical excellence'
    },
    {
      id: 5,
      year: 2018,
      title: 'Cultural Ambassador',
      category: 'Government Honor',
      description: 'Appointed as Cultural Ambassador of Assam'
    },
    {
      id: 6,
      year: 2020,
      title: 'Popular Choice Award',
      category: 'Best Singer',
      description: 'Audience choice for best regional singer'
    }
  ]

  useEffect(() => {
    // Try to fetch from Supabase, fallback to sample data
    const fetchAchievements = async () => {
      try {
        const data = await api.getAchievements()
        setAchievements(data.length > 0 ? data : sampleAchievements)
      } catch (error) {
        setAchievements(sampleAchievements)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  const getIcon = (category) => {
    if (category.toLowerCase().includes('singer')) return Award
    if (category.toLowerCase().includes('actor')) return Star
    return Trophy
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading achievements...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-yellow-400">Achievements</span> & Awards
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Celebrating a lifetime of excellence in music and cinema
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="text-center">
            <CardContent className="p-8">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">Total Awards</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-400">Music Awards</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-400">Acting Awards</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = getIcon(achievement.category)
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:bg-gray-800/50 transition-colors group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{achievement.year}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="inline-block bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                        {achievement.category}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-yellow-600/10 to-orange-500/10 border-yellow-400/20">
            <CardContent className="p-12">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                The Journey Continues
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Each award represents not just recognition, but the love and support of millions of fans 
                who have made this incredible journey possible.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements
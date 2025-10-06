import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Film, Calendar, Star, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'


const Filmography = () => {
  const [filmography, setFilmography] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data for demonstration
  const sampleFilmography = [
    {
      id: 1,
      movieName: 'Mon Jaai',
      year: 2008,
      role: 'Lead Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A romantic drama that showcased Zubeen\'s acting prowess'
    },
    {
      id: 2,
      movieName: 'Tumi Mur Mathu Mur',
      year: 2009,
      role: 'Lead Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A critically acclaimed performance in this emotional drama'
    },
    {
      id: 3,
      movieName: 'Kanchanjangha',
      year: 2010,
      role: 'Supporting Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A powerful supporting role that earned critical acclaim'
    },
    {
      id: 4,
      movieName: 'Ami Axomiya',
      year: 2012,
      role: 'Lead Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A patriotic film celebrating Assamese culture'
    },
    {
      id: 5,
      movieName: 'Bhoga Khirikee',
      year: 2014,
      role: 'Lead Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A comedy-drama that became a box office hit'
    },
    {
      id: 6,
      movieName: 'Ratnakar',
      year: 2016,
      role: 'Lead Actor',
      type: 'Assamese',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      description: 'A biographical drama showcasing historical events'
    }
  ]

  useEffect(() => {
    const fetchFilmography = async () => {
      try {
        const data = await api.getFilmography()
        setFilmography(data.length > 0 ? data : sampleFilmography)
      } catch (error) {
        setFilmography(sampleFilmography)
      } finally {
        setLoading(false)
      }
    }

    fetchFilmography()
  }, [])

  const getRoleIcon = (role) => {
    if (role.toLowerCase().includes('lead')) return Star
    return Film
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading filmography...</div>
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
            <span className="text-yellow-400">Cinematic</span> Journey
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            From music to movies - exploring Zubeen Garg's versatile acting career
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
              <Film className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Total Films</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-400">Lead Roles</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8">
              <Calendar className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-400">Years Active</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filmography Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">All Movies</TabsTrigger>
            <TabsTrigger value="lead">Lead Roles</TabsTrigger>
            <TabsTrigger value="supporting">Supporting</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filmography.map((movie, index) => {
                const RoleIcon = getRoleIcon(movie.role)
                return (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="overflow-hidden hover:bg-gray-800/50 transition-colors group h-full">
                      {/* Movie Poster */}
                      <div className="aspect-[2/3] relative overflow-hidden">
                        <img
                          src={movie.poster}
                          alt={movie.movieName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="lg"
                            className="text-white border-white hover:bg-white hover:text-black"
                          >
                            <Play className="h-6 w-6 mr-2" />
                            Watch Trailer
                          </Button>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                          <span>{movie.movieName}</span>
                          <RoleIcon className="h-5 w-5 text-yellow-400" />
                        </CardTitle>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{movie.year}</span>
                          </div>
                          <span className="text-sm bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                            {movie.type}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-3">
                          <span className="text-yellow-400 font-medium">{movie.role}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {movie.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="lead">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filmography
                .filter(movie => movie.role.toLowerCase().includes('lead'))
                .map((movie, index) => {
                  const RoleIcon = getRoleIcon(movie.role)
                  return (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="overflow-hidden hover:bg-gray-800/50 transition-colors group h-full">
                        <div className="aspect-[2/3] relative overflow-hidden">
                          <img
                            src={movie.poster}
                            alt={movie.movieName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{movie.movieName}</CardTitle>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{movie.year}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm">{movie.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
            </div>
          </TabsContent>

          <TabsContent value="supporting">
            <div className="text-center py-12">
              <Film className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-gray-400">Supporting role films coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Filmography
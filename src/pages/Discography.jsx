import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Play, Pause, Volume2, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'


const Discography = () => {
  const [discography, setDiscography] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Sample data for demonstration
  const sampleDiscography = [
    {
      id: 1,
      albumName: 'Bihuwan',
      year: 2005,
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      songs: [
        { title: 'Bihu Geet', link: '#', duration: '4:32' },
        { title: 'Assamese Folk', link: '#', duration: '5:15' },
        { title: 'Traditional Melody', link: '#', duration: '3:45' }
      ]
    },
    {
      id: 2,
      albumName: 'Ya Ali (Gangster)',
      year: 2006,
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      songs: [
        { title: 'Ya Ali', link: '#', duration: '5:22' },
        { title: 'Lamha Lamha', link: '#', duration: '4:18' }
      ]
    },
    {
      id: 3,
      albumName: 'Sagar Kuthi',
      year: 2008,
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      songs: [
        { title: 'Sagar Kuthi', link: '#', duration: '6:10' },
        { title: 'Morom Nohole', link: '#', duration: '4:55' },
        { title: 'Xopun Gole', link: '#', duration: '5:33' }
      ]
    },
    {
      id: 4,
      albumName: 'Chameli Rani',
      year: 2012,
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      songs: [
        { title: 'Chameli Rani', link: '#', duration: '4:28' },
        { title: 'Bukur Majot', link: '#', duration: '5:12' }
      ]
    }
  ]

  useEffect(() => {
    const fetchDiscography = async () => {
      try {
        const data = await api.getDiscography()
        setDiscography(data.length > 0 ? data : sampleDiscography)
      } catch (error) {
        setDiscography(sampleDiscography)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscography()
  }, [])

  const handlePlayPause = (song) => {
    if (currentSong?.title === song.title) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading discography...</div>
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
            <span className="text-yellow-400">Musical</span> Journey
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Explore the extensive discography spanning decades of musical excellence
          </p>
        </motion.div>

        {/* Music Player (if song is playing) */}
        {currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 right-6 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg p-4 z-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePlayPause(currentSong)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div>
                  <div className="text-white font-medium">{currentSong.title}</div>
                  <div className="text-gray-400 text-sm">{currentSong.duration}</div>
                </div>
              </div>
              <Volume2 className="h-5 w-5 text-gray-400" />
            </div>
          </motion.div>
        )}

        {/* Albums Grid */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">All Albums</TabsTrigger>
            <TabsTrigger value="assamese">Assamese</TabsTrigger>
            <TabsTrigger value="hindi">Hindi</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {discography.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:bg-gray-800/50 transition-colors group">
                    {/* Album Cover */}
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={album.cover}
                        alt={album.albumName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="lg"
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          <Play className="h-6 w-6 mr-2" />
                          Play Album
                        </Button>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">{album.albumName}</CardTitle>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{album.year}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2">
                        {album.songs.map((song, songIndex) => (
                          <div
                            key={songIndex}
                            className="flex items-center justify-between p-2 rounded hover:bg-gray-800/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handlePlayPause(song)}
                              >
                                {currentSong?.title === song.title && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <div>
                                <div className="text-white text-sm font-medium">{song.title}</div>
                              </div>
                            </div>
                            <div className="text-gray-400 text-sm">{song.duration}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assamese">
            <div className="text-center py-12">
              <Music className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-gray-400">Assamese albums coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="hindi">
            <div className="text-center py-12">
              <Music className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-gray-400">Hindi albums coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Discography
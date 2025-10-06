import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent } from '../components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'


const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample data for demonstration
  const sampleGallery = [
    {
      id: 1,
      imageUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
      caption: 'Live performance at Guwahati',
      category: 'concerts'
    },
    {
      id: 2,
      imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      caption: 'Recording session',
      category: 'studio'
    },
    {
      id: 3,
      imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      caption: 'Award ceremony',
      category: 'awards'
    },
    {
      id: 4,
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      caption: 'Movie premiere',
      category: 'movies'
    },
    {
      id: 5,
      imageUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
      caption: 'Concert in Mumbai',
      category: 'concerts'
    },
    {
      id: 6,
      imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      caption: 'Studio recording',
      category: 'studio'
    },
    {
      id: 7,
      imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      caption: 'Filmfare nomination',
      category: 'awards'
    },
    {
      id: 8,
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      caption: 'Film shooting',
      category: 'movies'
    }
  ]

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await api.getGallery()
        setGallery(data.length > 0 ? data : sampleGallery)
      } catch (error) {
        setGallery(sampleGallery)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % gallery.length
      : (currentIndex - 1 + gallery.length) % gallery.length
    
    setCurrentIndex(newIndex)
    setSelectedImage(gallery[newIndex])
  }

  const getFilteredImages = (category) => {
    if (category === 'all') return gallery
    return gallery.filter(image => image.category === category)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading gallery...</div>
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
            Photo <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Capturing moments from concerts, recordings, movies, and memorable events
          </p>
        </motion.div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="concerts">Concerts</TabsTrigger>
            <TabsTrigger value="studio">Studio</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          {['all', 'concerts', 'studio', 'movies', 'awards'].map((category) => (
            <TabsContent key={category} value={category} className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredImages(category).map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => openLightbox(image, index)}
                  >
                    <Card className="overflow-hidden hover:bg-gray-800/50 transition-colors group">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={image.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-white text-sm font-medium truncate">
                          {image.caption}
                        </p>
                        <p className="text-gray-400 text-xs capitalize mt-1">
                          {image.category}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => navigateImage('prev')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => navigateImage('next')}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
                  <p className="text-lg font-medium">{selectedImage.caption}</p>
                  <p className="text-gray-300 capitalize">{selectedImage.category}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Gallery
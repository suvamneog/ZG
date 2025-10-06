import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, Trash2, User, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'


const Tributes = () => {
  const [tributes, setTributes] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTribute, setNewTribute] = useState({ name: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  // Sample data for demonstration
  const sampleTributes = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      message: 'Zubeen da, your voice has been the soundtrack of my life. Thank you for all the beautiful memories.',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Priya Devi',
      message: 'Every song of yours touches the soul. You are not just a singer, but an emotion for all Assamese people.',
      created_at: '2024-01-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'Ankit Kumar',
      message: 'Ya Ali will forever remain one of the greatest songs ever. Your talent knows no bounds!',
      created_at: '2024-01-13T09:20:00Z'
    },
    {
      id: 4,
      name: 'Meera Goswami',
      message: 'From Assamese folk to Bollywood hits, you have conquered every genre. Truly inspiring!',
      created_at: '2024-01-12T18:15:00Z'
    }
  ]

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const data = await api.getTributes()
        setTributes(data.length > 0 ? data : sampleTributes)
      } catch (error) {
        setTributes(sampleTributes)
      } finally {
        setLoading(false)
      }
    }

    fetchTributes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTribute.name.trim() || !newTribute.message.trim()) return

    setSubmitting(true)
    try {
      const tribute = {
        name: newTribute.name.trim(),
        message: newTribute.message.trim(),
        created_at: new Date().toISOString()
      }
      
      // Try to add to Supabase, fallback to local state
      try {
        const addedTribute = await api.addTribute(tribute)
        setTributes(prev => [addedTribute, ...prev])
      } catch (error) {
        // Fallback: add to local state with temporary ID
        const localTribute = { ...tribute, id: Date.now() }
        setTributes(prev => [localTribute, ...prev])
      }
      
      setNewTribute({ name: '', message: '' })
    } catch (error) {
      console.error('Error submitting tribute:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteTribute(id)
      setTributes(prev => prev.filter(tribute => tribute.id !== id))
    } catch (error) {
      // Fallback: remove from local state
      setTributes(prev => prev.filter(tribute => tribute.id !== id))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading tributes...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-yellow-400">Tribute</span> Wall
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Share your love, memories, and appreciation for the legendary Zubeen Garg
          </p>
        </motion.div>

        {/* Add Tribute Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-yellow-400" />
                <span>Share Your Tribute</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newTribute.name}
                    onChange={(e) => setNewTribute(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Share your message, memory, or appreciation..."
                    rows={4}
                    value={newTribute.message}
                    onChange={(e) => setNewTribute(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={submitting || !newTribute.name.trim() || !newTribute.message.trim()}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Share Tribute
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tributes List */}
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="h-5 w-5" />
              <span>{tributes.length} tribute{tributes.length !== 1 ? 's' : ''} from fans</span>
            </div>
          </div>

          {tributes.map((tribute, index) => (
            <motion.div
              key={tribute.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="hover:bg-gray-800/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-600/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{tribute.name}</h3>
                        <p className="text-gray-400 text-sm">{formatDate(tribute.created_at)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tribute.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-300 leading-relaxed pl-13">
                    {tribute.message}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {tributes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Be the first to share a tribute!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Tributes
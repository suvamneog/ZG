// src/pages/Community.jsx
import { motion } from 'framer-motion'
import { Users, Heart, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import IphoneDemo from '../components/IphoneDemo'

const Community = () => {
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
            Fan <span className="text-yellow-400">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Connect with fellow Zubeen Garg fans from around the world
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-0 bg-gray-800/30">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Active Fans</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-gray-800/30">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Connections Made</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-gray-800/30">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">100K+</div>
              <div className="text-gray-400">Messages</div>
            </CardContent>
          </Card>
        </div>

        {/* iPhone Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-md mx-auto">
            <IphoneDemo />
          </div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Connect with fans who share your love for Zubeen Garg's music. 
            Discover new friends, share concert experiences, and celebrate the legacy together.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Community
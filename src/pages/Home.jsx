import { motion } from 'framer-motion'
import { Play, Award, Music, Film } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from '../components/ui/text_reveal_card'

const Home = () => {
  const stats = [
    { icon: Music, label: 'Albums', value: '30+' },
    { icon: Film, label: 'Movies', value: '50+' },
    { icon: Award, label: 'Awards', value: '100+' },
    { icon: Play, label: 'Songs', value: '500+' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 w-full max-w-6xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-white"
          >
            <span className="text-yellow-400">ZUBEEN</span> GARG
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            The King of Assamese Music - A Virtual Museum Celebrating the Legacy of a Legend
          </motion.p>

          {/* Text Reveal Card in Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center w-full">
              <TextRevealCard
                text="You know the musician"
                revealText="You know the legend"
                className="border-0 shadow-2xl"
              >
                <TextRevealCardTitle className="text-white text-xl font-semibold">
                  Experience the Magic
                </TextRevealCardTitle>
                <TextRevealCardDescription className="text-gray-300">
                  Hover to reveal the essence of a musical icon
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/about">
              <Button size="lg" className="text-lg px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                Explore His Journey
              </Button>
            </Link>
            <Link to="/discography">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-black">
                Listen to Music
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              A Legacy in <span className="text-yellow-400">Numbers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Decades of musical excellence and cinematic brilliance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-8 hover:bg-gray-800/50 transition-colors border-0 bg-gray-800/30">
                    <CardContent className="p-0">
                      <Icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Music Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-gray-800/30">
                <CardContent className="p-8">
                  <Music className="h-16 w-16 text-yellow-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Musical Journey</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    From folk melodies to modern hits, explore the diverse musical landscape 
                    that defines Zubeen Garg's extraordinary career spanning over three decades.
                  </p>
                  <Link to="/discography">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Explore Discography
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cinema Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-gray-800/30">
                <CardContent className="p-8">
                  <Film className="h-16 w-16 text-yellow-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Cinematic Excellence</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Beyond music, witness his remarkable acting prowess across numerous 
                    films that have left an indelible mark on Assamese cinema.
                  </p>
                  <Link to="/filmography">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      View Filmography
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
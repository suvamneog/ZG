import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, Music } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const About = () => {
  const timeline = [
    {
      year: '1972',
      title: 'Birth',
      description: 'Born in Tura, Meghalaya, India',
      icon: MapPin
    },
    {
      year: '1990s',
      title: 'Musical Beginnings',
      description: 'Started his musical journey in the Assamese music industry',
      icon: Music
    },
    {
      year: '2003',
      title: 'Bollywood Breakthrough',
      description: 'Sang "Ya Ali" for the movie Gangster, bringing him national recognition',
      icon: Award
    },
    {
      year: '2010s',
      title: 'Acting Career',
      description: 'Expanded into acting, appearing in numerous Assamese films',
      icon: Award
    },
    {
      year: 'Present',
      title: 'Legacy Continues',
      description: 'Continues to inspire generations with his music and performances',
      icon: Music
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-yellow-400">Zubeen Garg</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            The King of Assamese Music - A multifaceted artist who has redefined the landscape 
            of Indian music with his soulful voice and captivating performances.
          </p>
        </motion.div>

        {/* Biography Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400/20 to-orange-500/20">
              <img 
                src="https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Zubeen Garg"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Biography Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <span>Early Life</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Zubeen Garg was born on November 18, 1972, in Tura, Meghalaya. From an early age, 
                  he showed exceptional musical talent and began his journey in the world of music 
                  during his college years.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Music className="h-5 w-5 text-yellow-400" />
                  <span>Musical Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  His breakthrough came with the song "Ya Ali" from the Bollywood movie Gangster in 2006, 
                  which catapulted him to national fame. However, his roots remain deeply connected to 
                  Assamese folk music, where he has created timeless classics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Beyond music, Zubeen has made significant contributions to Assamese cinema as an actor 
                  and has been recognized with numerous awards for his contributions to Indian music and cinema.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Career <span className="text-yellow-400">Timeline</span>
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-yellow-400/30"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10"></div>
                    
                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <Card className="hover:bg-gray-800/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon className="h-6 w-6 text-yellow-400" />
                            <span className="text-2xl font-bold text-yellow-400">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
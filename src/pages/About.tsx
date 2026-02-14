import React from 'react';
import { Brain, Zap, Trophy, Target, Clock, Users, Sparkles, ArrowRight, Code, Palette, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const StatsCard = ({ value, label, icon }: StatsCardProps) => {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

interface HowToStepProps {
  number: number;
  title: string;
  description: string;
}

const HowToStep = ({ number, title, description }: HowToStepProps) => {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const navigate = useNavigate();

  const handleStartPlaying = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Train Your Brain</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Memory Card Game
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Challenge your mind, boost your memory, and have fun with our engaging memory card matching game. 
              Perfect for all ages and skill levels.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStartPlaying}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-500 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden border border-blue-500/30 hover:border-blue-400"
              >
                <span className="relative z-10">Start Playing</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('how-to-play')?.offsetTop || 0, behavior: 'smooth' })}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition-all duration-500 border border-white/30 hover:border-white/50 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What is Memory Card Game?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Memory Card Game is a classic brain-training puzzle that challenges players to find matching pairs 
              of cards. With its simple yet addictive gameplay, it's designed to improve your memory, concentration, 
              and cognitive abilities while providing hours of entertainment.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're looking to sharpen your mind, pass the time, or challenge friends and family, 
              our Memory Card Game offers a perfect blend of fun and mental exercise.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
                <Brain className="w-5 h-5" />
                <span>Brain Training</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-semibold">
                <Target className="w-5 h-5" />
                <span>All Skill Levels</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2 rounded-full font-semibold">
                <Users className="w-5 h-5" />
                <span>All Ages</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="w-full h-[400px] flex items-center justify-center">
                <span className="text-8xl">🧠</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Play Memory Card Game?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the amazing benefits and features that make our memory game stand out
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-7 h-7" />}
              title="Enhance Memory"
              description="Improve your short-term and working memory through engaging card matching challenges that exercise your brain."
            />
            <FeatureCard
              icon={<Zap className="w-7 h-7" />}
              title="Boost Concentration"
              description="Sharpen your focus and attention span as you remember card positions and patterns during gameplay."
            />
            <FeatureCard
              icon={<Trophy className="w-7 h-7" />}
              title="Track Progress"
              description="Monitor your performance with detailed statistics, including moves made, time taken, and accuracy rates."
            />
            <FeatureCard
              icon={<Target className="w-7 h-7" />}
              title="Multiple Difficulty Levels"
              description="Choose from easy, medium, and hard modes to match your skill level and gradually increase the challenge."
            />
            <FeatureCard
              icon={<Clock className="w-7 h-7" />}
              title="Quick Sessions"
              description="Enjoy short, engaging game sessions perfect for breaks, commutes, or whenever you have a few spare minutes."
            />
            <FeatureCard
              icon={<Users className="w-7 h-7" />}
              title="For Everyone"
              description="Suitable for all ages, from children developing cognitive skills to adults maintaining mental sharpness."
            />
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl transform -rotate-3"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-purple-100 to-pink-100">
              <div className="w-full h-[500px] flex items-center justify-center">
                <span className="text-9xl">🎮</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How to Play
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Master the game in four simple steps
            </p>
            <div className="space-y-8">
              <HowToStep
                number={1}
                title="Select Difficulty"
                description="Choose your preferred difficulty level - Easy (8 cards), Medium (12 cards), or Hard (20 cards)."
              />
              <HowToStep
                number={2}
                title="Flip the Cards"
                description="Click on any card to reveal its hidden image. Try to remember the position and pattern."
              />
              <HowToStep
                number={3}
                title="Find Matches"
                description="Click on another card to find its matching pair. If they match, they stay revealed. If not, they flip back."
              />
              <HowToStep
                number={4}
                title="Clear the Board"
                description="Continue until you've matched all pairs. Complete the game in the fewest moves and shortest time possible!"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Cognitive Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Playing memory games regularly can lead to significant improvements in brain function
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Memory Enhancement</h3>
              <p className="text-gray-600 leading-relaxed">
                Regular practice strengthens neural pathways responsible for memory formation and recall. 
                Studies show that memory games can improve both short-term and long-term memory retention by up to 30%.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Improved Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Memory games require sustained attention and concentration, helping to train your brain to focus for 
                longer periods. This translates to better productivity and attention in daily activities.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Problem-Solving Skills</h3>
              <p className="text-gray-600 leading-relaxed">
                Develop strategic thinking and pattern recognition abilities. Players learn to create mental maps 
                and develop efficient strategies for solving challenges more quickly.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mental Agility</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep your mind sharp and agile at any age. Memory games help maintain cognitive flexibility and can 
                even help delay age-related mental decline when practiced regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-gradient-to-br from-purple-600 to-black-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-16 lg:py-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4">
              By The Numbers
            </h2>
            <p className="text-xl text-blue-100 text-center mb-12 max-w-2xl mx-auto">
              Join thousands of players improving their cognitive abilities
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
              <StatsCard
                value="10K+"
                label="Daily Players"
                icon={<Users className="w-6 h-6" />}
              />
              <StatsCard
                value="50K+"
                label="Games Completed"
                icon={<Trophy className="w-6 h-6" />}
              />
              <StatsCard
                value="85%"
                label="Improvement Rate"
                icon={<Zap className="w-6 h-6" />}
              />
              <StatsCard
                value="4.8/5"
                label="User Rating"
                icon={<Sparkles className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Developer Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About the Developer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate developer behind this memory training game
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-blue-100 to-purple-100 h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto shadow-xl border-4 border-white">
                  <img 
                    src="/src/assets/somesh.jpeg" 
                    alt="Somesh Bhatnagar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initial if image fails to load
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">S</div>';
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Somesh Bhatnagar</h3>
                <p className="text-gray-600 mb-4">Full Stack Developer</p>
                <div className="flex justify-center gap-4">
                  <a href="https://github.com/someshcoder" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/somesh-bhatnagar-18b388328/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/bhatnagarsomesh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Crafted with Passion</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hi! I'm Somesh, a passionate full-stack developer who believes in creating meaningful digital experiences. 
              This Memory Card Game is built with React, TypeScript, and Tailwind CSS - combining modern technology 
              with intuitive design to help people train their minds.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              As someone who values continuous learning and cognitive health, I wanted to create a game that's not 
              just entertaining but genuinely beneficial for mental fitness. Every line of code reflects my commitment 
              to quality, accessibility, and user experience.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                <Code className="w-5 h-5" />
                <span>React & TypeScript</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-semibold">
                <Palette className="w-5 h-5" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold">
                <Zap className="w-5 h-5" />
                <span>Performance Focused</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg font-semibold">
                <Heart className="w-5 h-5" />
                <span>User-Centric</span>
              </div>
            </div>
            <p className="text-gray-500 italic">
              "Building applications that make a positive impact on people's lives is what drives me every day."
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95"></div>
          </div>
          <div className="relative px-8 py-20 lg:py-24 text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Challenge Your Mind?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey to a sharper memory and better focus today. 
              It's free, fun, and only takes a few minutes!
            </p>
            <button 
              onClick={handleStartPlaying}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.5)] transform hover:-translate-y-2 hover:scale-110 inline-flex items-center gap-3 text-lg relative overflow-hidden border border-blue-500/30 hover:border-blue-400"
            >
              <span className="relative z-10">Play Now</span>
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
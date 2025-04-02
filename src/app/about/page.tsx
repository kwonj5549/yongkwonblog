
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const Page = () => {
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
            Professional blogger, developer, and technology enthusiast.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <img 
              src="/YongKwonProfile.png"
              alt="Profile"
              className="rounded-xl w-full max-w-xs mx-auto"
            />
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" aria-label="Github">
                  <Github size={18} />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:contact@example.com" aria-label="Email">
                  <Mail size={18} />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Hello, I'm Yong Kwon</h2>
            
            <p>
              I'm a full-stack developer with over 10 years of experience in the tech industry. I've worked with startups and large corporations, helping them build innovative web applications and improve their development processes.
            </p>
            
            <p>
              My blog is where I share insights, tutorials, and opinions about web development, design patterns, and emerging technologies. I believe in writing content that is both educational and practical, focusing on solutions that developers can implement in their day-to-day work.
            </p>
            
            <h3 className="text-xl font-bold mt-8">My Expertise</h3>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Front-end Development (React, Vue, Angular)</li>
              <li>Back-end Development (Node.js, Python, Go)</li>
              <li>Cloud Architecture and DevOps</li>
              <li>Performance Optimization</li>
              <li>Technical Writing and Documentation</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8">Professional Experience</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Senior Developer at TechCorp</h4>
                <p className="text-gray-600">2018 - Present</p>
                <p>Leading development of cloud-native applications and mentoring junior developers.</p>
              </div>
              
              <div>
                <h4 className="font-bold">Full Stack Developer at StartupX</h4>
                <p className="text-gray-600">2015 - 2018</p>
                <p>Built and scaled the company's main SaaS product from early-stage to market fit.</p>
              </div>
              
              <div>
                <h4 className="font-bold">Web Developer at DesignAgency</h4>
                <p className="text-gray-600">2012 - 2015</p>
                <p>Created responsive websites and web applications for various clients.</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

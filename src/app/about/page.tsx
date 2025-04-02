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
              Accountant, Consultant &amp; M&amp;A Advisor
            </p>
          </div>
        </div>

        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <img
                  src="/YongKwonProfile.png"
                  alt="Yong Kwon"
                  className="rounded-xl w-full max-w-xs mx-auto"
              />

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" aria-label="Twitter">
                    <Twitter size={18} />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" aria-label="Github">
                    <Github size={18} />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </Link>
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
                I am an experienced accountant and consultant specializing in mergers &amp; acquisitions, exit planning, valuation consulting, and corporate finance advisory services. With over a decade of expertise, I have helped both public companies and family-owned businesses navigate complex financial landscapes and optimize their exit strategies.
              </p>

              <p>
                My blog is dedicated to sharing insightful analyses, strategic advice, and real-world case studies on M&amp;A, business valuation, and exit planning. I aim to provide practical guidance for business owners, investors, and professionals seeking to maximize value and ensure smooth transitions.
              </p>

              <h3 className="text-xl font-bold mt-8">My Expertise</h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Mergers &amp; Acquisitions Advisory</li>
                <li>Business Valuation Consulting</li>
                <li>Exit Planning &amp; Succession Strategies</li>
                <li>Corporate Finance &amp; Tax Planning</li>
                <li>Strategic Financial Management</li>
              </ul>

              {/*<h3 className="text-xl font-bold mt-8">Professional Experience</h3>*/}

              {/*<div className="space-y-4">*/}
              {/*  <div>*/}
              {/*    <h4 className="font-bold">M&amp;A Consultant at BizConMnA Advisors</h4>*/}
              {/*    <p className="text-gray-600">2018 - Present</p>*/}
              {/*    <p>*/}
              {/*      Providing expert guidance on mergers &amp; acquisitions, exit planning, and business valuation to a diverse portfolio of clients.*/}
              {/*    </p>*/}
              {/*  </div>*/}

              {/*  <div>*/}
              {/*    <h4 className="font-bold">Senior Accountant at Financial Insights</h4>*/}
              {/*    <p className="text-gray-600">2015 - 2018</p>*/}
              {/*    <p>*/}
              {/*      Led financial analysis and valuation projects, ensuring accurate assessments for strategic transactions.*/}
              {/*    </p>*/}
              {/*  </div>*/}

              {/*  <div>*/}
              {/*    <h4 className="font-bold">Consultant at Corporate Solutions</h4>*/}
              {/*    <p className="text-gray-600">2012 - 2015</p>*/}
              {/*    <p>*/}
              {/*      Advised on corporate restructuring and exit strategies, optimizing financial performance for sustainable business growth.*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*</div>*/}

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

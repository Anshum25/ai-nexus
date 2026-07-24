import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { ElevatorNavigation } from '../components/portfolio/experience/ElevatorNavigation';
import { CompanyFloor, CompanyData } from '../components/portfolio/experience/CompanyFloor';
import { Bot, Server, Shield, Cloud, Terminal, Cpu } from 'lucide-react';
import { constructSEO } from "@/lib/seo";

export const Route = createFileRoute('/experience')({
  head: () => constructSEO({
    title: "Experience | Anshum Dev",
    description: "Engineering experience across Enterprise AI, FinTech, and Logistics. View my journey as a Backend & AI Engineer.",
    path: "/experience",
    keywords: ["Backend Engineer Experience", "AI Engineer Experience", "Enterprise Software Engineer"],
  }),
  component: ExperienceCenter,
});

const COMPANIES: CompanyData[] = [
  {
    id: 'nexus',
    name: 'Nexus Corporation',
    role: 'Senior AI Engineer',
    duration: '2024 - Present',
    location: 'San Francisco, CA',
    teamSize: '12',
    industry: 'Enterprise AI',
    overview: 'Nexus Corporation builds autonomous AI agents for Fortune 500 supply chains. I was hired to rip out their slow, hallucination-prone LangChain wrappers and build a deterministic, sub-second latency agentic orchestration engine from scratch.',
    techStack: ['Python', 'FastAPI', 'Qdrant', 'Redis', 'Docker', 'AWS ECS', 'OpenAI'],
    ownership: [
      { id: 'rag', title: 'RAG Pipeline', icon: Bot, desc: 'Designed the semantic caching and vector search pipeline that reduced LLM API costs by 40% while dropping response times from 4s to 800ms.', architecture: '[Query] -> [Redis Cache] -> [Qdrant HNSW] -> [Context Assembly] -> [GPT-4o]' },
      { id: 'auth', title: 'RBAC Auth Service', icon: Shield, desc: 'Built the zero-trust authentication gateway handling 50k requests/min. Implemented JWT signing with RS256 and Redis-backed session invalidation.', architecture: '[API Gateway] -> [Auth Middleware] -> (Valid) -> [Microservices]' }
    ],
    problems: [
      {
        title: 'The Great Context Limit Crash',
        businessNeed: 'Agents needed to analyze 500-page PDF financial reports without crashing or hallucinating numbers.',
        constraints: 'Token limits strictly capped at 128k. We could not afford 2-minute latency waits for full document ingestion.',
        solution: 'Implemented a sliding-window chunking strategy with hierarchical summary generation. The agent routes queries to pre-computed summaries first, then retrieves exact chunks only if needed.',
        result: 'Achieved 99.2% retrieval accuracy on financial figures with 1.2s average latency. System now handles 10,000 documents a day.'
      }
    ],
    schedule: [
      { time: '09:00 AM', label: 'Async Standup', desc: 'Reading Slack threads. I avoid synchronous morning meetings to preserve deep work windows.' },
      { time: '10:00 AM', label: 'Architecture Drafting', desc: 'Writing RFCs (Request for Comments) for the new embedding model migration. No code is written without a peer-reviewed plan.' },
      { time: '01:00 PM', label: 'Execution', desc: 'Translating the RFC into Python. Building the Qdrant ingestion worker.' },
      { time: '04:00 PM', label: 'Load Testing', desc: 'Using Locust to hammer the new worker with 10k concurrent requests to find breaking points.' }
    ],
    lessons: [
      'LangChain is great for prototypes, but custom orchestration is required for production reliability.',
      'Never trust an LLM to output valid JSON without strict Pydantic validation and retry logic in the loop.'
    ]
  },
  {
    id: 'dataflow',
    name: 'DataFlow Inc',
    role: 'Backend Engineer',
    duration: '2022 - 2024',
    location: 'Remote',
    teamSize: '8',
    industry: 'FinTech',
    overview: 'DataFlow processed millions of micro-transactions daily. When I joined, their monolithic Node.js backend was falling over during peak trading hours. I led the migration to a microservices architecture.',
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Kafka', 'Kubernetes', 'Datadog'],
    ownership: [
      { id: 'kafka', title: 'Event Streaming', icon: Cloud, desc: 'Replaced synchronous HTTP calls between the billing and trading modules with an asynchronous Kafka event bus, preventing cascading failures.', architecture: '[Trading Node] -> (Produce) -> [Kafka Topic] -> (Consume) -> [Billing Worker]' },
      { id: 'db', title: 'Database Sharding', icon: Server, desc: 'Partitioned the 5TB transaction table by date and tenant_id, reducing query times for historical analytics from 45 seconds to 2 seconds.', architecture: '[App] -> [PgBouncer] -> [Primary DB (Current Month)] \n                            -> [Archive DB (Historical)]' }
    ],
    problems: [
      {
        title: 'The Deadlock Cascade',
        businessNeed: 'Process 5,000 transactions per second during market open.',
        constraints: 'ACID compliance required. Cannot lose a single transaction. Legacy DB was experiencing massive row-level locking.',
        solution: 'Moved from pessimistic locking to optimistic concurrency control (OCC) using version columns. Offloaded balance aggregation to a Redis cache that syncs to Postgres every 5 seconds.',
        result: 'Eliminated deadlocks entirely. System handled 12k TPS during the next market open without breaking a sweat.'
      }
    ],
    schedule: [
      { time: '08:30 AM', label: 'Datadog Review', desc: 'Checking error rates and latency spikes from the European market session.' },
      { time: '10:00 AM', label: 'Pair Programming', desc: 'Working with junior engineers to untangle legacy monolithic controllers.' },
      { time: '01:00 PM', label: 'Migration Coding', desc: 'Writing the Kafka producers for the new event-driven architecture.' },
      { time: '05:00 PM', label: 'Canary Deployment', desc: 'Routing 5% of production traffic to the new microservice and monitoring logs.' }
    ],
    lessons: [
      'Microservices don\'t solve bad code, they just distribute it. Fix the domain logic before splitting the monolith.',
      'Always have a one-click rollback plan for database migrations.'
    ]
  },
  {
    id: 'technova',
    name: 'TechNova',
    role: 'Software Engineering Intern',
    duration: '2021',
    location: 'Austin, TX',
    teamSize: '5',
    industry: 'Logistics',
    overview: 'My first taste of production engineering. I was tasked with building an internal dashboard to track fleet vehicles in real-time, learning how to handle raw WebSockets and messy geospatial data.',
    techStack: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'Google Maps API'],
    ownership: [
      { id: 'ws', title: 'Real-Time Telemetry', icon: Terminal, desc: 'Built a Socket.io server that ingested GPS coordinates from 500 trucks every 3 seconds and broadcasted them to the React frontend.', architecture: '[Truck IoT] -> [Express Webhook] -> [Socket.io] -> [React Dashboard]' },
      { id: 'algo', title: 'Route Optimization', icon: Cpu, desc: 'Implemented a basic TSP (Traveling Salesperson) heuristic using the Google Maps Distance Matrix API to suggest better delivery routes.', architecture: '[Addresses] -> [Distance Matrix] -> [Greedy Algorithm] -> [Optimized Route]' }
    ],
    problems: [
      {
        title: 'The MongoDB Memory Leak',
        businessNeed: 'Dashboard needed to show historical routes for any truck over the past 30 days.',
        constraints: 'Server had only 4GB RAM. Fetching 30 days of GPS points per truck crashed the Node process.',
        solution: 'Learned about database indexing. Added a compound index on (truck_id, timestamp) and implemented pagination on the frontend.',
        result: 'Query times dropped from timing out to 50ms. The Node process stabilized.'
      }
    ],
    schedule: [
      { time: '09:00 AM', label: 'Mentor Sync', desc: 'Reviewing yesterday\'s code and asking questions about JavaScript closures.' },
      { time: '10:30 AM', label: 'Frontend Hacking', desc: 'Struggling with React state management to make the map markers move smoothly.' },
      { time: '02:00 PM', label: 'Backend Setup', desc: 'Writing Express routes and learning how to use Postman to test them.' },
      { time: '04:30 PM', label: 'Code Review', desc: 'Getting my PR shredded by the senior dev, learning more in 30 minutes than in 3 years of college.' }
    ],
    lessons: [
      'Indexes matter. A missing index will take down your entire application.',
      'Don\'t be afraid to ask for help when you are stuck for more than 2 hours.'
    ]
  }
];

function ExperienceCenter() {
  const [activeFloor, setActiveFloor] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to track which floor is currently active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveFloor(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.3, // Trigger when 30% of the company is visible
      }
    );

    const floorElements = document.querySelectorAll('.company-floor-container');
    floorElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--foreground)] relative flex overflow-hidden">
      
      <ElevatorNavigation 
        floors={COMPANIES} 
        activeFloor={activeFloor} 
        setFloor={setActiveFloor} 
      />

      <div ref={containerRef} className="flex-1 relative h-screen overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth">
        
        {/* Background Grids */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0" style={{ backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent pointer-events-none z-20" />
        <div className="fixed bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none z-20" />

        {/* Floors */}
        <div className="relative z-10 flex flex-col w-full max-w-6xl mx-auto">
          {COMPANIES.map((company, index) => (
            <div key={company.id} className="company-floor-container" data-index={index}>
              <CompanyFloor 
                company={company} 
                index={index} 
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



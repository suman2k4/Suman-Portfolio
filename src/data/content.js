export const heroContent = {
  name: 'Suman S',
  role: 'AI & Data Science Graduate',
  highlights: ['Generative AI', 'Machine Learning', 'Python Solutions'],
  tagline:
    'Aspiring AI and Data Science graduate crafting applied ML, Generative AI, and automation projects for real teams.',
  location: 'Coimbatore, Tamil Nadu',
  portraitUrl: '/media/suman-portrait.jpg',
  portraitAlt: 'Suman illuminated by neon red signage'
}

export const aboutContent = {
  paragraphs: [
    "I am a final-year B.Tech student specializing in Artificial Intelligence and Data Science with a strong foundation in Python, Machine Learning, and Generative AI.",
    "My technical expertise lies in building end-to-end AI solutions. I have successfully deployed projects ranging from Supply Chain Demand Forecasting (improving accuracy by 15%) to GenAI video summarizers. My experience extends to full-stack development and DevOps, ensuring that the models I build are scalable and deployable.",
    "Currently, I am an AIML Engineer Intern at Syncner, working on recommendation engines and web scraping pipelines. I am Azure AI Fundamentals certified and passionate about leveraging data to drive business insights."
  ],
  tag: "AI/ML Engineer | Data Science Enthusiast"
}

export const experience = [
  {
    role: 'AIML Engineer Intern & Scrum Master',
    company: 'Syncner',
    duration: 'Jul 2025 — Present',
    description:
      'Learning production-grade web scraping, steering sprint rituals, and contributing to recommendation systems that improve personalization quality.',
    stack: ['Python', 'Scrapy', 'Recommendation Systems', 'Agile']
  },
  {
    role: 'Full Stack Intern',
    company: 'Webgen Technologies',
    duration: 'Sep 2024 — Dec 2024',
    description:
      'Built polished frontend utilities (calculator, login form, digital clock) while learning Git-driven collaboration and delivery cadence.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Git']
  }
]

export const skills = [
  {
    category: 'Programming Languages',
    items: [
      { label: 'Python', level: 0.92, note: 'Primary language' },
      { label: 'HTML', level: 0.82, note: 'UI builds' },
      { label: 'CSS', level: 0.8, note: 'Responsive layouts' },
      { label: 'SQL', level: 0.78, note: 'Analytics' }
    ]
  },
  {
    category: 'Libraries & Frameworks',
    items: [
      { label: 'TensorFlow', level: 0.82, note: 'Modeling' },
      { label: 'Keras', level: 0.8, note: 'Rapid prototyping' },
      { label: 'NumPy / Pandas', level: 0.85, note: 'Data wrangling' },
      { label: 'Scikit-Learn', level: 0.8, note: 'Classic ML' },
      { label: 'Flask / Streamlit', level: 0.75, note: 'Deployment' },
      { label: 'React.js', level: 0.7, note: 'Interactive UI' }
    ]
  },
  {
    category: 'DevOps & Tools',
    items: [
      { label: 'Git & GitHub Actions', level: 0.78, note: 'Collaboration' },
      { label: 'Docker', level: 0.72, note: 'Containerization' },
      { label: 'DVC', level: 0.68, note: 'Data versioning' },
      { label: 'Jupyter / VS Code', level: 0.85, note: 'Everyday IDEs' },
      { label: 'Asana', level: 0.65, note: 'Team ops' }
    ]
  }
]

export const projects = [
  {
    title: 'Listenerrr — Video Lecture to Notes',
    description:
      'Transform lecture videos into searchable study artifacts (notes, flashcards, semantic search) using FastAPI, Celery, and local LLMs (Gemma). Features a React frontend, Dockerized microservices architecture, and simulated mock pipelines for rapid dev.',
    tags: ['Celery', 'React', 'Docker', 'LLM'],
    features: [
      'FastAPI backend exposing upload and job status endpoints.',
      'Celery worker pipeline for Markdown, PDF, flashcards, and search index.',
      'PostgreSQL schema managed via Alembic.',
      'Docker Compose stack including Redis, MinIO, and Vite frontend.',
      'Pytest suite with unit + integration coverage.'
    ],
    links: {
      github: 'https://github.com/suman2k4/Listenerrr',
      live: '#'
    }
  },
  {
    title: 'YTBriefAI — YouTube Summarizer',
    description:
      'Automates content repurposing by extracting audio, transcribing with Faster-Whisper, and generating summaries, SEO hashtags, and catchy titles using Google Gemini. Built with Python and optional Streamlit UI.',
    tags: ['Gemini AI', 'Python', 'Streamlit', 'SEO'],
    features: [
      'Upload YouTube video or provide URL for processing.',
      'Audio extraction via moviepy and transcription using Faster-Whisper.',
      'Concise summarization and SEO hashtag generation with Google Gemini.',
      'Catchy title suggestions optimized for engagement.',
      'Optional Streamlit UI for user-friendly interaction.'
    ],
    links: {
      github: 'https://github.com/suman2k4/ytbriefai',
      live: '#'
    }
  },
  {
    title: 'AI-Powered Autonomous Trading',
    description:
      'Production-grade trading platform with <100ms execution latency. Sustainable architecture featuring XGBoost/LSTM models (>=70% accuracy), Go execution engine, Redis streams, and a React/TypeScript dashboard with real-time analytics.',
    tags: ['TypeScript', 'XGBoost', 'Redis', 'Microservices'],
    features: [
      'Multi-model support: XGBoost, LightGBM, LSTM (PyTorch).',
      'High-performance Go execution engine (<100ms latency).',
      'Redis Streams for low-latency message queuing.',
      'Vectorized backtesting engine (vectorbt).',
      'Real-time dashboard with candlestick charts and WebSocket updates.'
    ],
    links: {
      github: 'https://github.com/suman2k4/AI-POWERED-AUTONOUMS-TRADING',
      live: '#'
    }
  },
  {
    title: 'Supply Chain Demand Forecasting',
    description:
      'End-to-end forecasting system using ARIMA, Prophet, and LSTM to predict product demand. Integrates MLflow for tracking experiments, DVC for data versioning, and a Streamlit frontend for interactive visualization.',
    tags: ['DVC', 'Streamlit', 'Prophet', 'LSTM'],
    features: [
      'Ingests and preprocesses historical supply chain data.',
      'Experiments with ARIMA, Prophet, and LSTM models.',
      'Captures seasonality, trend, holidays, and volatility.',
      'Interactive Streamlit frontend for forecast visualization.',
      'Tracks experiments via MLflow and versions data with DVC.'
    ],
    links: {
      github: 'https://github.com/suman2k4',
      live: '#'
    }
  }
]

export const certifications = [
  {
    name: 'Microsoft Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    year: '2024',
    link: '/Certificates/Azure%20AI%20Fundamentals.pdf',
    image: '/Certificates/Azure AI Fundamentals.png',
    tags: ['AI', 'Cloud', 'Azure'],
    description:
      'Foundational certification on Azure AI spanning ML concepts, cognitive services, CV, NLP, and responsible AI practices.'
  },
  {
    name: 'Databases and SQL for Data Science',
    issuer: 'IBM / Coursera',
    year: 'Nov 2025',
    link: '/Certificates/IBM%20Database%20and%20Sql.pdf',
    image: '/Certificates/Databases and SQL for Data Science.png',
    tags: ['SQL', 'Data Science'],
    description:
      'Hands-on SQL labs covering filtering, joins, subqueries, views, DDL/DML, and schema design for analytics workloads.'
  },
  {
    name: 'Data Science Methodology',
    issuer: 'IBM / Coursera',
    year: 'Nov 2025',
    link: '/Certificates/IBM%20Data%20Science%20Methodology.pdf',
    image: '/Certificates/IBM data science methodology.png',
    tags: ['Data Science', 'Methodology'],
    description:
      'End-to-end CRISP-DM framing: define business problems, prep data, build, evaluate, and deploy models responsibly.'
  },
  {
    name: 'Tools for Data Science',
    issuer: 'IBM / Coursera',
    year: 'Nov 2025',
    link: '/Certificates/IBM%20Tools%20for%20Data%20Science%20V2.pdf',
    image: '/Certificates/Tools for Data Science V2.png',
    tags: ['Data Science Tools'],
    description:
      'Introduces professional DS tooling—Jupyter, Git, RStudio, Watson Studio, Anaconda—and collaborative workflows.'
  },
  {
    name: 'Crash Course on Python',
    issuer: 'Google / Coursera',
    year: 'Jul 2025',
    link: '/Certificates/Google%20crash%20course%20on%20python.pdf',
    image: '/Certificates/Google crash course on python.png',
    tags: ['Python', 'Programming Foundations'],
    description:
      'Python fundamentals: loops, functions, data structures, automation concepts, and scripting for beginner-to-intermediate builders.'
  },
  {
    name: 'Python for Data Science and AI',
    issuer: 'IBM / Coursera',
    year: 'Jul 2025',
    link: '/Certificates/IBM%20Python%20for%20Data%20Science%20and%20AI.pdf',
    image: '/Certificates/Python for Data Science and AI.png',
    tags: ['Python', 'Data Science', 'AI'],
    description:
      'Practical Python for DS & AI: pandas, NumPy, visualization, and core ML concepts for end-to-end workflows.'
  },
  {
    name: 'Python Project for Data Science',
    issuer: 'IBM / Coursera',
    year: 'Jul 2025',
    link: '/Certificates/IBM%20Python%20Project%20for%20Data%20Science.pdf',
    image: '/Certificates/Python Project for Data Science.png',
    tags: ['Python', 'Project', 'Data Science'],
    description:
      'Capstone applying Python to collect, wrangle, analyze, and visualize real datasets to generate actionable insights.'
  },
  {
    name: 'Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2025]',
    issuer: 'Udemy',
    year: 'Apr 2025',
    link: '/Certificates/Udemy.pdf',
    image: '/Certificates/Udemy Machine learning A-Z.png',
    tags: ['Machine Learning', 'AI', 'Python', 'R'],
    description:
      '43-hour masterclass spanning supervised + unsupervised ML, preprocessing, evaluation, clustering, automation, and GPT-integrated workflows.'
  }
]

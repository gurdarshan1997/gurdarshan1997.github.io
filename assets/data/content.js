/*  ────────────────────────────────────────────────────────────────
    SITE CONTENT — single source of truth.
    Every theme reads from window.SITE. Edit text, projects, links
    and image paths here; never inside index.html.
    (A .js file instead of .json so the site also works when you
    double-click index.html locally — browsers block fetch() on file://)
    ──────────────────────────────────────────────────────────────── */
window.SITE = {
  person: {
    name: "Gurdarshan Singh",
    firstName: "Gurdarshan",
    shortName: "Guru",
    initials: "GS",
    headline: "Data & Business Analyst",
    tagline: "I turn raw operational data into clean datasets, dashboards and automated pipelines that help teams decide faster.",
    location: "Winnipeg, MB, Canada",
    timezone: "America/Winnipeg",
    status: "Open to work",
    availability: "Open to data & BI roles in Winnipeg and remote across Canada",
    email: "guruthemr.singh@gmail.com",
    linkedin: "https://www.linkedin.com/in/gurdarshan-singh-a32b36259",
    github: "https://www.github.com/gurdarshan1997",
    site: "https://gurdarshan1997.github.io/",
    languages: ["English", "Hindi", "Punjabi"],
    images: {
      hero: "assets/img/portrait/portrait-hero.webp",
      heroBW: "assets/img/portrait/portrait-hero-bw.webp",
      full: "assets/img/portrait/portrait-cutout-full.webp",
      photo: "assets/img/portrait/portrait-photo.webp",
      avatar: "assets/img/portrait/avatar.webp"
    }
  },

  /* Rotating words on the flip card in the hero */
  roles: ["Data Analyst", "Business Analyst", "Power BI Developer", "ETL Engineer", "Python Developer"],

  /* "Ability card" — the trading-card style skills summary */
  abilityCard: {
    stats: [
      { label: "SQL", value: 90 },
      { label: "Power BI / DAX", value: 88 },
      { label: "Python", value: 85 },
      { label: "Excel", value: 90 },
      { label: "ETL / Pipelines", value: 78 },
      { label: "Cloud (GCP)", value: 65 }
    ],
    moves: ["Turn vague questions into metrics", "Clean 8M+ row datasets", "Ship dashboards people actually open"]
  },

  skills: {
    technical: ["Python", "SQL", "Power BI", "DAX", "Excel (advanced)", "PostgreSQL", "MongoDB", "BigQuery", "Looker Studio", "Apache Airflow", "Apache Kafka", "GCP Dataflow / Pub/Sub", "Bash", "Git", "MATLAB", "SAP Analytics Cloud"],
    domain: ["Logistics / LTL", "Ad-hoc analysis", "Stakeholder communication", "Documentation", "Problem solving", "Time management"]
  },

  /* Doors = one per skill area. `projects` reference ids below. */
  doors: [
    { id: "bi", title: "Dashboards & BI", kicker: "Power BI · DAX · Looker", blurb: "Multi-page Power BI reports built on real star-schema models — from KPI cards to decomposition trees.", projects: ["olist", "sales"] },
    { id: "eng", title: "Data Engineering", kicker: "Airflow · PostgreSQL · BigQuery", blurb: "ETL pipelines and warehouses: download, clean, reshape, load, verify — then schedule it.", projects: ["airflow", "warehouse", "chicago"] },
    { id: "stream", title: "Streaming", kicker: "Kafka · Pub/Sub · Dataflow", blurb: "Real-time feeds landing in databases, and dashboards that refresh every minute.", projects: ["kafka", "taxi"] },
    { id: "ml", title: "ML & Operations", kicker: "Deep learning · Python", blurb: "Deep-learning image classification compared across four model families, plus routing analysis for operations.", projects: ["plant", "routes", "mini"] },
    { id: "certs", title: "Credentials", kicker: "Python · SQL · Analytics", blurb: "Industry certificates in Python, SQL, analytics and cloud tools.", certs: true }
  ],

  projects: {
    olist: {
      title: "E-commerce Orders — Power BI Dashboard",
      label: "Power BI · 8 pages",
      sub: "Olist Brazilian e-commerce · ~100k orders",
      text: "An eight-page Power BI report over the Olist dataset: executive overview, time trends, category performance, customer behaviour, geography, delivery logistics, payments and reviews. Nine related tables, custom DAX measures and a Sunburst custom visual.",
      kpis: "olist",
      tags: ["Power BI", "DAX", "Data modelling", "Star schema"],
      image: "assets/img/projects/olist-powerbi-dashboard.webp",
      links: [{ label: "Read the visuals report (PDF)", href: "assets/docs/olist-dashboard-visuals-report.pdf" }]
    },
    sales: {
      title: "Sales Performance Dashboard",
      label: "Power BI · 5 pages",
      sub: "Retail sales · 2023 · 4-table model",
      text: "Sales preview, product performance, customer insights and time-based insights, with region / category / month slicers on every page. Bonus page uses a running-total measure, a multi-line chart, a Sunburst and a decomposition tree.",
      kpis: "sales",
      tags: ["Power BI", "DAX", "Running totals", "Custom visuals"],
      chart: "sales"
    },
    airflow: {
      title: "Traffic Data ETL Pipeline with Apache Airflow",
      label: "Airflow · Python · Bash",
      sub: "DAG traffic_data_ETL · @daily",
      text: "A DAG that creates directories, downloads and extracts a remote archive, pulls fields from CSV, TSV and fixed-width files, combines them and transforms the result. Run history monitored through Airflow's Graph, Gantt and Task Duration views.",
      tags: ["Airflow DAGs", "PythonOperator", "BashOperator", "File-based ETL"],
      image: "assets/img/projects/airflow-traffic-etl-graph.webp",
      gallery: ["assets/img/projects/airflow-traffic-etl-grid.webp", "assets/img/projects/airflow-traffic-etl-gantt.webp", "assets/img/projects/airflow-task-duration.webp"],
      links: [{ label: "Read the report (PDF)", href: "assets/docs/airflow-traffic-etl-report.pdf" }]
    },
    warehouse: {
      title: "Billing Data Warehouse in PostgreSQL",
      label: "PostgreSQL · Bash · SQL",
      sub: "bill_dwh · star schema",
      text: "A star-schema warehouse (DimCustomer, DimMonth, FactBilling) built end to end by one Bash script: create the database, download the SQL, load dimensions then facts, and verify row counts — checked in both logs and pgAdmin.",
      tags: ["Star schema", "PostgreSQL", "Bash automation", "Data validation"],
      image: "assets/img/projects/warehouse-star-schema.webp",
      gallery: ["assets/img/projects/warehouse-bash-script.webp"],
      links: [{ label: "Read the report (PDF)", href: "assets/docs/billing-data-warehouse-report.pdf" }]
    },
    chicago: {
      title: "Chicago Crime — Dataprep Cleaning & BigQuery",
      label: "Dataprep · BigQuery",
      sub: "~8.3M rows profiled and cleaned",
      text: "Removed duplicates, standardised dates, booleans and location fields, and engineered time-of-day, weekday and severity features. Exported to BigQuery to explore hotspots, temporal patterns and null-value discrepancies.",
      tags: ["Data cleaning", "Feature engineering", "BigQuery SQL"]
    },
    kafka: {
      title: "Weather Streaming with Apache Kafka",
      label: "Kafka · Python · PostgreSQL",
      sub: "Winnipeg & Vancouver · every 5 seconds",
      text: "A Python producer sends synthetic weather readings (temperature, wind, humidity) to the weather-data topic; a consumer stamps each event and inserts it into a PostgreSQL weather_events table, verified flowing end to end in real time.",
      tags: ["Kafka", "Producers / consumers", "PostgreSQL", "Logging"],
      image: "assets/img/projects/kafka-weather-stream.webp",
      gallery: ["assets/img/projects/kafka-producer-code.webp"],
      links: [{ label: "Read the report (PDF)", href: "assets/docs/kafka-weather-streaming-report.pdf" }]
    },
    taxi: {
      title: "Real-Time Taxi Streaming with Dataflow & Pub/Sub",
      label: "GCP · Looker Studio",
      sub: "~29k events / minute",
      text: "Connected a public Pub/Sub topic of NYC taxi rides to a Dataflow streaming job writing into a partitioned BigQuery table, then built a Looker Studio bubble map refreshing every minute.",
      tags: ["Pub/Sub", "Dataflow", "BigQuery", "Real-time dashboards"],
      image: "assets/img/projects/taxi-dataflow-looker-map.webp"
    },
    routes: {
      title: "Routing & Scheduling Analysis",
      label: "Python · Geospatial",
      sub: "Operations optimisation",
      text: "Analysed real stop and route data to reduce redundant travel. A Python script computes distances between locations, generates more efficient visit sequences and outputs an interactive map plus summary report.",
      tags: ["Python", "Geospatial", "Operations"],
      image: "assets/img/projects/route-optimizer-map.webp"
    },
    plant: {
      title: "Plant Disease Prediction from Leaf Photos",
      label: "Deep learning · team of 3",
      sub: "PlantVillage · 38 classes across 14 crops · ~53k images",
      text: "Compared four model families for diagnosing leaf disease from a single photo: a baseline CNN, ResNet50, EfficientNetB4 and a Vision Transformer. Images resized to 224×224 with flip, rotate and brightness augmentation, an 80/20 split, transfer learning, early stopping and checkpointing. ViT reached 99.3% accuracy; EfficientNetB4 (97.4%) was recommended for production as the best accuracy-to-size trade-off, with a simple web flow and confidence thresholds. Built with Bhaskar Bhallamundi and Atul Kumar.",
      stats: [["99.3%", "ViT accuracy"], ["97.4%", "EfficientNetB4"], ["0.986", "EffNet macro F1"], ["86.3%", "baseline CNN"]],
      tags: ["TensorFlow / Keras", "Transfer learning", "CNN · ResNet · ViT", "Model evaluation"],
      image: "assets/img/projects/plant-disease-results.webp",
      gallery: ["assets/img/projects/plant-disease-vit-predictions.webp", "assets/img/projects/plant-disease-vit-curves.webp", "assets/img/projects/plant-disease-web-flow.webp", "assets/img/projects/plant-disease-model.webp"],
      links: [{ label: "View the slides (PDF)", href: "assets/docs/plant-disease-prediction-slides.pdf" }]
    },
    mini: {
      title: "End-to-End Analytics Mini-Projects",
      label: "SQL · Power BI · ML",
      sub: "Crime, sales, fitness and traffic data",
      text: "Raw datasets taken through joining, cleaning, modelling and reporting, with dashboards that explain trends and recommendations to non-technical audiences.",
      tags: ["SQL", "EDA", "Dashboards"]
    }
  },

  certs: [
    { title: "Data Analytics Job Simulation", org: "Deloitte Australia · Forage", date: "Jul 2025", image: "assets/img/certs/deloitte-forage.webp" },
    { title: "Exploring SAP Analytics Cloud", org: "SAP", date: "Sep 2025", image: "assets/img/certs/sap-analytics-cloud.webp" },
    { title: "SQL (Basic)", org: "HackerRank", date: "15 Jun 2025", image: "assets/img/certs/hackerrank-sql.webp" },
    { title: "Python (Basic)", org: "HackerRank", date: "10 Mar 2023", image: "assets/img/certs/hackerrank-python.webp" },
    { title: "Python 101 for Data Science", org: "IBM · Cognitive Class", date: "Mar 2023", image: "assets/img/certs/ibm-python.webp" },
    { title: "Python", org: "Kaggle", date: "Dec 2022", image: "assets/img/certs/kaggle-python.webp" }
  ],

  /* Timeline — newest first. `mark` is the big number shown on the left. */
  story: [
    { mark: "2026", when: "Now", title: "Open to data & BI roles", org: "Winnipeg, MB · remote across Canada", points: ["Looking for analyst, BI and junior data-engineering roles.", "Bringing logistics domain knowledge plus SQL, Python and Power BI."] },
    { mark: "2025", when: "Aug 2025 — Sep 2025", title: "Traffic / Rate Analyst Co-op", org: "Gardewine · Winnipeg, MB", points: ["Pulled and cleaned shipment, route and rate data to support daily decisions.", "Built Excel and Python analyses on volume, cost and performance trends.", "Turned vague questions from operations and management into concrete metrics."] },
    { mark: "2024", when: "2024 — 2025", title: "PGDM, Predictive Analytics", org: "University of Winnipeg", points: ["Machine learning: classification, regression, clustering.", "Data acquisition, ETL, warehousing and streaming (Airflow, Kafka, PostgreSQL).", "Visualisation and dashboarding in Power BI and Looker Studio."] },
    { mark: "2021", when: "Jul 2021 — Jul 2024", title: "Python / MATLAB Developer", org: "iBrandizer · India", points: ["Built and maintained data-processing and analysis scripts in Python and MATLAB.", "Implemented cleaning, transformation and reporting logic for internal projects.", "Used version control to keep analyses reproducible."] },
    { mark: "2016", when: "2016 — 2020", title: "B.Tech, Electrical Engineering", org: "UPES, Dehradun", points: ["Where it started: maths, systems and problem solving.", "First Python and MATLAB code written here."] }
  ]
};

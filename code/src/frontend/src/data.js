export const incidents = [
  {
    id: 10,
    name: "ShopVerse Frontend",
    appName: "ShopVerse Frontend",
    description: "Frontend application for ShopVerse.",
    summary: "Handles user interactions and displays product information. The frontend is designed to be responsive and user-friendly, ensuring a seamless shopping experience across all devices. It integrates with various backend services to fetch and display data in real-time.\n\nThe frontend also includes features such as product search, filtering, and sorting, allowing users to easily find the products they are looking for. Additionally, it supports user authentication and account management, enabling users to view their order history and manage their personal information.",
    status: "open",
    dependencies: [
      { id: "11", name: "ShopVerse Gateway" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [],
    platform: {
      type: "Kubernetes",
      namespace: "frontend-ns",
      hosts: ["k8s-node-101", "k8s-node-102"]
    }
  },
  {
    id: 11,
    name: "ShopVerse Gateway",
    appName: "ShopVerse Gateway",
    description: "API gateway for ShopVerse.",
    summary: "Routes requests to appropriate backend services. The gateway acts as a reverse proxy, handling incoming requests and routing them to the appropriate microservices. It also provides features such as load balancing, rate limiting, and authentication.\n\nThe gateway ensures that all requests are properly authenticated and authorized before being forwarded to the backend services. It also handles retries and circuit breaking, ensuring that the system remains resilient and available even in the face of failures.",
    status: "closed",
    dependencies: [
      { id: "12", name: "Catalog Explorer" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "10", name: "ShopVerse Frontend" },
      { id: "14", name: "Account Nexus" },
      { id: "15", name: "CartOwl" },
      { id: "16", name: "Payments Prime" },
      { id: "17", name: "Fulfillment Hub" },
      { id: "19", name: "NotifyMe" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "gateway-ns",
      hosts: ["k8s-node-103", "k8s-node-104"]
    }
  },
  {
    id: 12,
    name: "Catalog Explorer",
    appName: "Catalog Explorer",
    description: "Service for exploring product catalogs.",
    summary: "Provides search and filtering capabilities for products. The service indexes product data from various sources and provides a unified search interface for users. It supports advanced search features such as faceted search, full-text search, and autocomplete.\n\nThe Catalog Explorer is optimized for performance, ensuring that search results are returned quickly even for large datasets. It also includes features such as relevance ranking and personalized recommendations, helping users find the most relevant products.",
    status: "inprogress",
    dependencies: [
      { id: "Elasticsearch", name: "Elasticsearch Cluster" },
      { id: "MongoDB", name: "MongoDB DB" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" },
      { id: "13", name: "SmartSuggest" }
    ],
    platform: {
      type: "Linux Servers",
      hostnames: ["linux-cat-01", "linux-cat-02"],
      os: "Ubuntu 20.04 LTS"
    }
  },
  {
    id: 13,
    name: "SmartSuggest",
    appName: "SmartSuggest",
    description: "Recommendation engine for ShopVerse.",
    summary: "Provides product recommendations based on user behavior. The service uses machine learning algorithms to analyze user behavior and generate personalized product recommendations. It integrates with the Catalog Explorer to fetch product data and with the ShopVerse Gateway to receive user events.\n\nSmartSuggest continuously learns from user interactions, improving the accuracy of its recommendations over time. It also supports A/B testing, allowing the team to experiment with different recommendation strategies and measure their impact on user engagement and sales.",
    status: "open",
    dependencies: [
      { id: "12", name: "Catalog Explorer" },
      { id: "TensorFlow", name: "TensorFlow" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "PCF",
      namespace: "smart-pcf-ns",
      hosts: ["pcf-host-03", "pcf-host-04"]
    }
  },
  {
    id: 14,
    name: "Account Nexus",
    appName: "Account Nexus",
    description: "User account management service.",
    summary: "Handles user authentication and account details. The service provides APIs for user registration, login, password management, and profile updates. It integrates with third-party authentication providers such as Google and Facebook for social login.\n\nAccount Nexus also includes features such as multi-factor authentication and account recovery, ensuring that user accounts are secure. It stores user data in a secure and compliant manner, adhering to data protection regulations such as GDPR.",
    status: "closed",
    dependencies: [
      { id: "Firebase Auth", name: "Firebase Auth" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Windows Servers",
      hostnames: ["win-acc-01", "win-acc-02"],
      os: "Windows Server 2019"
    }
  },
  {
    id: 15,
    name: "CartOwl",
    appName: "CartOwl",
    description: "Shopping cart service.",
    summary: "Manages user shopping carts and checkout process. The service provides APIs for adding, updating, and removing items from the cart. It also handles the checkout process, including calculating totals, applying discounts, and processing payments.\n\nCartOwl integrates with various payment gateways to support different payment methods. It also includes features such as cart persistence, allowing users to save their carts and resume their shopping later. The service ensures that the checkout process is smooth and secure, minimizing cart abandonment.",
    status: "inprogress",
    dependencies: [
      { id: "Redis", name: "Redis Cache" },
      { id: "Kafka", name: "Kafka Queue" },
      { id: "11", name: "ShopVerse Gateway" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Linux Servers",
      hostnames: ["linux-cart-01"],
      os: "CentOS 7"
    }
  },
  {
    id: 16,
    name: "Payments Prime",
    appName: "Payments Prime",
    description: "Payment processing service.",
    summary: "Handles payment transactions and integrations with payment gateways. The service provides APIs for processing payments, managing payment methods, and handling refunds. It supports various payment methods, including credit cards, digital wallets, and bank transfers.\n\nPayments Prime ensures that all transactions are secure and compliant with industry standards such as PCI DSS. It also includes features such as fraud detection and prevention, helping to protect the business and its customers from fraudulent activities.",
    status: "open",
    dependencies: [
      { id: "Stripe", name: "Stripe API" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Windows Servers",
      hostnames: ["win-pay-01", "win-pay-02"],
      os: "Windows Server 2016"
    }
  },
  {
    id: 17,
    name: "Fulfillment Hub",
    appName: "Fulfillment Hub",
    description: "Order fulfillment service.",
    summary: "Manages order processing and shipment. The service provides APIs for creating, updating, and tracking orders. It integrates with various shipping carriers to provide real-time tracking information and updates.\n\nFulfillment Hub ensures that orders are processed efficiently and accurately, minimizing delays and errors. It also includes features such as inventory management and order routing, helping to optimize the fulfillment process and reduce costs.",
    status: "closed",
    dependencies: [
      { id: "PostgreSQL", name: "PostgreSQL DB" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "PCF",
      namespace: "fulfill-pcf-ns",
      hosts: ["pcf-ful-01", "pcf-ful-02"]
    }
  },
  {
    id: 18,
    name: "Insight Dashboard",
    appName: "Insight Dashboard",
    description: "Monitoring and analytics dashboard.",
    summary: "Provides insights and metrics for various services. The dashboard aggregates data from multiple sources and presents it in a unified interface. It includes features such as real-time monitoring, alerting, and reporting.\n\nInsight Dashboard helps the team to monitor the health and performance of the system, identify issues, and take proactive measures to resolve them. It also provides historical data and trends, helping to make informed decisions and improve the overall system performance.",
    status: "inprogress",
    dependencies: [
      { id: "Grafana", name: "Grafana Dashboard" },
      { id: "Prometheus", name: "Prometheus Metrics" },
      { id: "Elasticsearch", name: "Elasticsearch Logging" },
      { id: "Kibana", name: "Kibana Visualization" }
    ],
    dependents: [],
    platform: {
      type: "Kubernetes",
      namespace: "dashboard-ns",
      hosts: ["k8s-dash-01", "k8s-dash-02"]
    }
  },
  {
    id: 19,
    name: "NotifyMe",
    appName: "NotifyMe",
    description: "Notification service.",
    summary: "Sends notifications via SMS, email, and push notifications. The service provides APIs for sending notifications to users through various channels. It integrates with third-party services such as Twilio and Firebase Cloud Messaging to deliver notifications.\n\nNotifyMe supports features such as scheduling, templates, and personalization, allowing the team to send targeted and timely notifications. It also includes analytics and reporting, helping to measure the effectiveness of the notifications and improve user engagement.",
    status: "open",
    dependencies: [
      { id: "Twilio", name: "Twilio SMS" },
      { id: "FCM", name: "Firebase Cloud Messaging" },
      { id: "AWS Lambda", name: "AWS Lambda" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "notify-ns",
      hosts: ["k8s-notify-01"]
    }
  },
  {
    id: 20,
    name: "CloudCore",
    appName: "CloudCore",
    description: "Core cloud infrastructure service.",
    summary: "Provides core cloud services and infrastructure management. The service provides APIs for managing cloud resources such as virtual machines, containers, and storage. It integrates with various cloud providers such as AWS, Google Cloud, and Azure.\n\nCloudCore ensures that the infrastructure is scalable, reliable, and secure. It also includes features such as monitoring, logging, and automation, helping to streamline operations and reduce the operational overhead.",
    status: "closed",
    dependencies: [
      { id: "Docker", name: "Docker" },
      { id: "Kubernetes", name: "Kubernetes" },
      { id: "GCR", name: "Google Cloud Run" },
      { id: "AWS Lambda", name: "AWS Lambda" },
      { id: "Terraform", name: "Terraform" }
    ],
    dependents: [
      { id: "10", name: "ShopVerse Frontend" },
      { id: "11", name: "ShopVerse Gateway" },
      { id: "12", name: "Catalog Explorer" },
      { id: "13", name: "SmartSuggest" },
      { id: "14", name: "Account Nexus" },
      { id: "15", name: "CartOwl" },
      { id: "16", name: "Payments Prime" },
      { id: "17", name: "Fulfillment Hub" },
      { id: "19", name: "NotifyMe" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "cloudcore-ns",
      hosts: ["k8s-core-01", "k8s-core-02", "k8s-core-03"]
    }
  }
];
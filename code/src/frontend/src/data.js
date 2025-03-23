export const incidents = [
  {
    id: 10,
    name: "ShopVerse Frontend",
    appName: "ShopVerse Frontend",
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
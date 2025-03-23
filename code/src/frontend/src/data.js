export const incidents = [
  {
    id: 1,
    name: "Application A",
    appName: "Application A",
    dependencies: [
      { id: "B", name: "Application B" },
      { id: "E", name: "Application E" },
      { id: "DB", name: "Database" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "S", name: "Application S" },
      { id: "T", name: "Application T" }
    ]
  },
  {
    id: 2,
    name: "Application B",
    appName: "Application B",
    dependencies: [
      { id: "C", name: "Application C" },
      { id: "D", name: "Application D" },
      { id: "Cache", name: "Cache" }
    ],
    dependents: [
      { id: "A", name: "Application A" }
    ]
  },
  {
    id: 3,
    name: "Application C",
    appName: "Application C",
    dependencies: [
      { id: "D", name: "Application D" },
      { id: "F", name: "Application F" },
      { id: "Kafka", name: "Kafka Queue" }
    ],
    dependents: [
      { id: "B", name: "Application B" }
    ]
  },
  {
    id: 4,
    name: "Application D",
    appName: "Application D",
    dependencies: [
      { id: "F", name: "Application F" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "B", name: "Application B" },
      { id: "C", name: "Application C" }
    ]
  },
  {
    id: 5,
    name: "Application E",
    appName: "Application E",
    dependencies: [
      { id: "F", name: "Application F" },
      { id: "G", name: "Application G" },
      { id: "Cache", name: "Cache" }
    ],
    dependents: [
      { id: "A", name: "Application A" }
    ]
  },
  {
    id: 6,
    name: "Application F",
    appName: "Application F",
    dependencies: [
      { id: "H", name: "Application H" },
      { id: "DB", name: "Database" }
    ],
    dependents: [
      { id: "C", name: "Application C" },
      { id: "D", name: "Application D" },
      { id: "E", name: "Application E" }
    ]
  },
  {
    id: 7,
    name: "Application G",
    appName: "Application G",
    dependencies: [
      { id: "I", name: "Application I" },
      { id: "J", name: "Application J" },
      { id: "Kafka", name: "Kafka Queue" }
    ],
    dependents: [
      { id: "E", name: "Application E" }
    ]
  },
  {
    id: 8,
    name: "Application H",
    appName: "Application H",
    dependencies: [
      { id: "I", name: "Application I" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "F", name: "Application F" }
    ]
  },
  {
    id: 9,
    name: "Application I",
    appName: "Application I",
    dependencies: [
      { id: "K", name: "Application K" },
      { id: "DB", name: "Database" }
    ],
    dependents: [
      { id: "G", name: "Application G" },
      { id: "H", name: "Application H" }
    ]
  },
  {
    id: 10,
    name: "Application J",
    appName: "Application J",
    dependencies: [
      { id: "K", name: "Application K" },
      { id: "L", name: "Application L" },
      { id: "Cache", name: "Cache" }
    ],
    dependents: [
      { id: "G", name: "Application G" }
    ]
  },
  {
    id: 11,
    name: "Application K",
    appName: "Application K",
    dependencies: [
      { id: "M", name: "Application M" },
      { id: "N", name: "Application N" },
      { id: "Kafka", name: "Kafka Queue" }
    ],
    dependents: [
      { id: "I", name: "Application I" },
      { id: "J", name: "Application J" }
    ]
  },
  {
    id: 12,
    name: "Application L",
    appName: "Application L",
    dependencies: [
      { id: "N", name: "Application N" },
      { id: "O", name: "Application O" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "J", name: "Application J" }
    ]
  },
  {
    id: 13,
    name: "Application M",
    appName: "Application M",
    dependencies: [
      { id: "O", name: "Application O" },
      { id: "DB", name: "Database" }
    ],
    dependents: [
      { id: "K", name: "Application K" }
    ]
  },
  {
    id: 14,
    name: "Application N",
    appName: "Application N",
    dependencies: [
      { id: "P", name: "Application P" },
      { id: "Q", name: "Application Q" },
      { id: "Cache", name: "Cache" }
    ],
    dependents: [
      { id: "K", name: "Application K" },
      { id: "L", name: "Application L" }
    ]
  },
  {
    id: 15,
    name: "Application O",
    appName: "Application O",
    dependencies: [
      { id: "Q", name: "Application Q" },
      { id: "R", name: "Application R" },
      { id: "Kafka", name: "Kafka Queue" }
    ],
    dependents: [
      { id: "L", name: "Application L" },
      { id: "M", name: "Application M" }
    ]
  },
  {
    id: 16,
    name: "Application P",
    appName: "Application P",
    dependencies: [
      { id: "S", name: "Application S" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "N", name: "Application N" }
    ]
  },
  {
    id: 17,
    name: "Application Q",
    appName: "Application Q",
    dependencies: [
      { id: "S", name: "Application S" },
      { id: "T", name: "Application T" },
      { id: "DB", name: "Database" }
    ],
    dependents: [
      { id: "N", name: "Application N" },
      { id: "O", name: "Application O" }
    ]
  },
  {
    id: 18,
    name: "Application R",
    appName: "Application R",
    dependencies: [
      { id: "T", name: "Application T" },
      { id: "Cache", name: "Cache" }
    ],
    dependents: [
      { id: "O", name: "Application O" }
    ]
  },
  {
    id: 19,
    name: "Application S",
    appName: "Application S",
    dependencies: [
      { id: "A", name: "Application A" },
      { id: "ExtAPI", name: "External API" }
    ],
    dependents: [
      { id: "P", name: "Application P" },
      { id: "Q", name: "Application Q" }
    ]
  },
  {
    id: 20,
    name: "Application T",
    appName: "Application T",
    dependencies: [
      { id: "A", name: "Application A" },
      { id: "Kafka", name: "Kafka Queue" }
    ],
    dependents: [
      { id: "Q", name: "Application Q" },
      { id: "R", name: "Application R" }
    ]
  }
];
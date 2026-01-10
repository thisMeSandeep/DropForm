# Schema for entities-

erDiagram
USER ||--o{ FORM : owns
FORM ||--o{ RESPONSE : collects

    USER {
        string id PK
        string name
        string email UK
        int responseLimit
        int responsesUsed
        string role
        boolean isActive
        datetime createdAt
    }

    FORM {
        string id PK
        string userId FK
        string title
        string description
        json fieldSchema
        json designSchema
        string status
        boolean isArchived
        int totalResponses
        datetime lastResponseAt
        datetime createdAt
        datetime updatedAt
        datetime publishedAt
    }

    RESPONSE {
        string id PK
        string formId FK
        json values
        json metadata
        datetime createdAt
    }

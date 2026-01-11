# Auto save form schema to db -> Syncing

---
config:
  layout: dagre
---
flowchart TB
    A["User Action"] -- Create New Form / Open Template --> B["Initialize Editor"]
    B --> C["Create Form Record in DB"]
    C -- Returns formId + version --> D["Load Editor State"]
    D --> E["User Edits Form"]
    E --> F["Update Local Editor State"]
    F --> G["Mark dirty = true"]
    G --> H["Debounce Timer 800-1500ms"]
    H -- "Timer fires & dirty=true" --> I["Prepare Save Payload"]
    I --> J["Increment Local Version"]
    J --> K["PATCH /forms/:id"]
    K -- version matches --> L["DB Update Success"]
    K -- version mismatch --> M["Conflict Detected"]
    L --> N["dirty = false"] & O["Show Saved"]
    M --> P["Show Warning"]
    P --> Q["Prompt Reload or Manual Resolve"]
    E -- Offline --> R["Queue Changes Locally"]
    R -- Back Online --> H
const forms = [
  {
    title: "Frontend Developer Job Application",
    description: "Apply for the frontend developer role",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "full_name",
          type: "text",
          label: "Full Name",
          required: true,
          validation: {
            minLength: 2,
            maxLength: 50,
          },
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          required: true,
        },
        {
          name: "experience",
          type: "number",
          label: "Years of Experience",
          required: true,
          validation: {
            min: 0,
            max: 40,
          },
        },
        {
          name: "tech_stack",
          type: "select",
          label: "Primary Tech Stack",
          required: true,
          options: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
          ],
        },
        {
          name: "portfolio_url",
          type: "text",
          label: "Portfolio Website",
          required: false,
          validation: {
            pattern: "https?://.+",
          },
        },
      ],
    },
    designSchema: {
      theme: "light",
      primaryColor: "#2563eb",
      backgroundColor: "#ffffff",
      fontFamily: "Inter",
      borderRadius: "md",
      spacing: "comfortable",
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "outlined",
      },
      button: {
        text: "Submit Application",
        variant: "solid",
      },
    },
  },
  {
    title: "Product Feedback Survey",
    description: "Help us improve by sharing your feedback",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "user_name",
          type: "text",
          label: "Your Name",
          required: false,
        },
        {
          name: "rating",
          type: "radio",
          label: "How would you rate our product?",
          required: true,
          options: [
            { label: "Excellent", value: "5" },
            { label: "Good", value: "4" },
            { label: "Average", value: "3" },
            { label: "Poor", value: "2" },
            { label: "Very Poor", value: "1" },
          ],
        },
        {
          name: "features_used",
          type: "checkbox",
          label: "Which features do you use?",
          required: false,
          options: [
            { label: "Dashboard", value: "dashboard" },
            { label: "Form Builder", value: "builder" },
            { label: "AI Insights", value: "ai" },
          ],
        },
        {
          name: "feedback",
          type: "textarea",
          label: "Your Feedback",
          required: true,
          validation: {
            minLength: 10,
            maxLength: 500,
          },
        },
        {
          name: "contact_email",
          type: "email",
          label: "Contact Email (optional)",
          required: false,
        },
      ],
    },

    designSchema: {
      theme: "dark",
      primaryColor: "#22c55e",
      backgroundColor: "#020617",
      fontFamily: "System",
      borderRadius: "lg",
      spacing: "relaxed",
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "filled",
      },
      button: {
        text: "Send Feedback",
        variant: "soft",
      },
    },
  },
];

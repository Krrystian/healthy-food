import * as React from "react";

interface EmailTemplateProps {
  title: string;
  children: string;
  button?: boolean;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  children,
  button = false,
}) => (
  <div
    style={{
      width: "600px",
      backgroundColor: "#FBA100",
      color: "black",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <img
        src="https://healthy-food-indol.vercel.app/logo.png"
        alt="logo"
        width="100"
        height="100"
      />
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>Healthy You</h1>
    </div>
    <div
      style={{ backgroundColor: "#023047", color: "#FBA100", padding: "16px" }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "start" }}>
        {title}
      </h2>
      <div
        style={{ color: "white", opacity: 0.8, textAlign: "left" }}
        dangerouslySetInnerHTML={{ __html: children }}
      ></div>
      {button && (
        <a
          href="https://healthy-food-indol.vercel.app/"
          style={{
            display: "inline-block",
            backgroundColor: "#FBA100",
            color: "#023047",
            padding: "8px 16px",
            marginTop: "16px",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "medium",
          }}
        >
          Sprawdź nowości
        </a>
      )}
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        backgroundColor: "#023047",
      }}
    >
      <p style={{ opacity: 0.5, fontStyle: "italic", margin: 0 }}>
        Proszę nie odpowiadaj na ten email.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#023047",
        }}
      >
        <p style={{ fontWeight: "bold" }}>Healthy You 2024</p>
      </div>
    </div>
  </div>
);

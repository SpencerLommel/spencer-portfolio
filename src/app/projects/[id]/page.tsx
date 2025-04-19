type Props = {
    params: {
      id: string;
    };
  };
  
  export default async function ProjectPage({ params }: Props) {
    const { id } = params; // ← fixes the false warning
  
    return (
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 600, margin: 0 }}>
          Project {id}
        </h1>
        <p style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
          This is the project page for project {id}.
        </p>
      </div>
    );
  }
  
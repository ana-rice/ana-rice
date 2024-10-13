import { H2 } from "@/components/ui/typography";

const DashboardPage = () => {
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const file = selectedFiles ? selectedFiles[0] : null;
    if (file !== null && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target !== null && event.target.result !== null) {
          try {
            const response = await fetch("/api/users/uploadImage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: event.target.result }),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-20 py-8">
      <H2 className="mb-3">Dashboard</H2>
      <input type="file" accept="image/*" onChange={uploadImage} />
    </div>
  );
};

export default DashboardPage;

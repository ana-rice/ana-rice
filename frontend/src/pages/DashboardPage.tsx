import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/toaster";
import { H2 } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const DashboardPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const file = selectedFiles ? selectedFiles[0] : null;
    if (file !== null && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target !== null && event.target.result !== null) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (image !== null) {
      setLoading(true);
      try {
        const response = await fetch("/api/users/uploadImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Image failed to upload.",
        });
        // ? Do we log this?
        console.log(error);
      }
      setImage(null);
      setLoading(false);
    }
  };

  return (
    <div className="px-20 py-8">
      {/* Heading */}
      <H2 className="mb-3">Dashboard</H2>

      {/* File Upload */}
      <div className="flex">
        <Input
          className="cursor-pointer"
          type="file"
          accept="image/*"
          onChange={handleSelectFile}
        />
        {loading ? (
          <Spinner className="ml-1 mt-2" />
        ) : (
          <Button onClick={handleUpload}>Upload</Button>
        )}
      </div>

      {/* Preview Image */}
      {image && <img src={image} />}

      {/* Display Toast Message */}
      <Toaster />
    </div>
  );
};

export default DashboardPage;

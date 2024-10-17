import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/toaster";
import { H2 } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const DashboardPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageString, setImageString] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Callback function called when file is selected.
  // Updates the image state to be the selected file so we can preview it.
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const file = selectedFiles ? selectedFiles[0] : null;

    if (file !== null) {
      setFile(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target !== null && event.target.result !== null) {
          setImageString(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Callback function called when form is submitted.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file !== null) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      try {
        const response = await fetch("/api/users/uploadImage", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        toast({
          title: "Success!",
          description: "File uploaded successfully.",
        });
        console.log(data);
      } catch (error) {
        // Display "toast" at the bottom of the page during error.
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Image failed to upload.",
        });
        // ? Do we log this?
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <div className="px-20 py-8">
      {/* Heading */}
      <H2 className="mb-3">Dashboard</H2>

      {/* File Upload */}
      <form className="my-3 flex" onSubmit={handleSubmit}>
        <Input
          className="mr-2"
          type="file"
          name="file"
          onInput={handleSelectFile}
        />
        {loading ? <Spinner /> : <Button type="submit">Submit</Button>}
      </form>

      {/* Preview Image */}
      {imageString && <img src={imageString} />}

      {/* Display Toast Message */}
      <Toaster />
    </div>
  );
};

export default DashboardPage;

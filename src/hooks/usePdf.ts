import { FileforgeClient } from "@fileforge/client";
import { compile } from "@fileforge/react-print";
import { InVoiceComponent } from "../components/pdf/InVoiceComponent";

export const usePdf = (HTML: any) => {
  const generatePDF = async () => {
    const ff = new FileforgeClient({
      apiKey: "30a0f029-81db-4b91-83b5-4005a771a8a8",
    });
    (async () => {
      try {
        const pdf = await ff.pdf.generate(
          [new File([HTML], "index.html", { type: "text/html" })],
          {
            options: {
              host: true,
            },
          },
          {
            timeoutInSeconds: 30,
          }
        );
        console.log(pdf.url);
      } catch (error) {
        console.error("Error during PDF conversion:", error);
      }
    })();
  };

  return {
    generatePDF,
  };
};

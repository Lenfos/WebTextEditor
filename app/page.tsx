import CredentialForms from "@/components/CredentialForms";
import {Toaster} from "@/components/ui/sonner";
import LoginBackground from "@/components/LoginBackground";

export default function Home() {
  return (
          <div className="" >
              <LoginBackground
                  className="flex justify-center items-center h-screen"
                  children={<CredentialForms/>}/>
              <Toaster richColors />
          </div>
  );
}

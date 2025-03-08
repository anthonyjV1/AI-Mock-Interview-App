import Container from "@/components/ui/container";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
        {/* handler to sotre the user data */}
        <Header />

        <Container className="flex-grow">
          <main className='flex-grow'>
            <Outlet />
          </main>
        </Container>
          
        

        <Footer />
    </div>
  )
}


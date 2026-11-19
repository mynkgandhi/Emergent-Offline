import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QuoteProvider } from "@/lib/quote";
import { CompareProvider } from "@/lib/compare";
import { CompareBar } from "@/components/site/Compare";
import Compare from "@/pages/Compare";
import Finder from "@/pages/Finder";
import SpecPack from "@/pages/SpecPack";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { QuoteDrawer } from "@/components/site/QuoteDrawer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import Home from "@/pages/Home";
import Catalogue from "@/pages/Catalogue";
import ProductPage from "@/pages/ProductPage";
import Enquiry from "@/pages/Enquiry";
import Trade from "@/pages/Trade";

function App() {
  return (
    <HashRouter>
      <QuoteProvider>
        <CompareProvider>
        <SmoothScroll />
        <div className="min-h-screen bg-ink font-body text-bone print:bg-white">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/spec-pack" element={<SpecPack />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
        <QuoteDrawer />
        <CompareBar />
        <Toaster position="bottom-center" theme="dark" />
        </CompareProvider>
      </QuoteProvider>
    </HashRouter>
  );
}

export default App;

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface VerificationFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function VerificationForm({ onSubmit, isLoading }: VerificationFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit(text);
  };

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 mb-20 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#dee5ff] font-['Manrope'] mb-4">
          Verify  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6bff8f] to-[#0abc56]">the Truth</span>
        </h1>
        <p className="text-lg text-[#a3aac4] font-['Inter']">
          Paste a news article, claim, or URL below. Our AI will analyze credibility, cross-reference sources, and provide a definitive verdict.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6bff8f]/20 to-[#0abc56]/20 rounded-[28px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-[#091328] border border-[#141f38] rounded-3xl p-2 shadow-2xl transition-all duration-300 hover:border-[#6bff8f]/30">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste news or claim to verify..."
            className="min-h-[160px] text-lg lg:text-xl border-0 focus-visible:ring-0 bg-transparent text-[#dee5ff] placeholder:text-[#4d556b] resize-none p-6 font-['Inter']"
            disabled={isLoading}
          />
          <div className="flex justify-end p-2 border-t border-[#141f38]/50 mt-2">
            <Button
              type="submit"
              disabled={!text.trim() || isLoading}
              className="rounded-full px-8 py-6 bg-gradient-to-br from-[#6bff8f] to-[#0abc56] hover:from-[#5bf083] hover:to-[#09a049] text-[#002c0f] font-bold text-lg shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:shadow-[0_0_30px_rgba(107,255,143,0.5)] transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Verify Claim
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

import { Copy, Check, ExternalLink, AlertTriangle, Info, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { APIResponse } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export function ResultsViewer({ data }: { data: APIResponse }) {
  const [copied, setCopied] = useState(false);
  const [reasoningExpanded, setReasoningExpanded] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.extracted.search_query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict.toUpperCase()) {
      case "TRUE": return "bg-[#6bff8f] text-[#002c0f]";
      case "FALSE": return "bg-[#ff7351] text-[#450900]";
      default: return "bg-[#fdc425] text-[#574000]";
    }
  };

  const getCardColor = (verdict: string) => {
    switch (verdict.toUpperCase()) {
      case "TRUE": return "border-[#6bff8f]/30 shadow-[0_0_40px_rgba(107,255,143,0.1)]";
      case "FALSE": return "border-[#ff7351]/30 shadow-[0_0_40px_rgba(255,115,81,0.1)]";
      default: return "border-[#fdc425]/30 shadow-[0_0_40px_rgba(253,196,37,0.1)]";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-4 pb-20 space-y-8 font-['Inter']"
    >
      {/* 1. VERDICT CARD */}
      <Card className={`rounded-3xl bg-[#091328] border-2 ${getCardColor(data.analysis.verdict)} overflow-hidden relative`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[#a3aac4] uppercase tracking-wider font-semibold text-sm mb-2 font-['Manrope']">Final Verdict</h2>
            <div className={`inline-block px-6 py-2 rounded-full font-black text-4xl md:text-5xl tracking-tight font-['Manrope'] ${getVerdictColor(data.analysis.verdict)}`}>
              {data.analysis.verdict.toUpperCase()}
            </div>
            {data.analysis.recommendation && (
              <p className="mt-6 text-lg text-[#dee5ff] border-l-4 border-[#141f38] pl-4">
                {data.analysis.recommendation}
              </p>
            )}
          </div>
          
          <div className="w-full md:w-64 space-y-6 bg-[#0f1930] p-6 rounded-2xl border border-[#141f38]">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-[#a3aac4]">Credibility</span>
                <span className="text-2xl font-bold text-[#dee5ff] font-['Manrope']">{data.analysis.credibility_score}/100</span>
              </div>
              <Progress value={data.analysis.credibility_score} className="h-2 bg-[#060e20]" indicatorColor={data.analysis.verdict === 'TRUE' ? 'bg-[#6bff8f]' : data.analysis.verdict === 'FALSE' ? 'bg-[#ff7351]' : 'bg-[#fdc425]'} />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-[#a3aac4]">Confidence</span>
                <span className="text-2xl font-bold text-[#dee5ff] font-['Manrope']">{data.analysis.confidence}%</span>
              </div>
              <Progress value={data.analysis.confidence} className="h-2 bg-[#060e20]" indicatorColor="bg-[#4d556b]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 2. ANALYSIS INSIGHTS */}
          <Card className="rounded-3xl bg-[#091328] border border-[#141f38]">
            <CardHeader>
              <CardTitle className="font-['Manrope'] text-2xl text-[#dee5ff]">Analysis Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-[#060e20] rounded-2xl p-4 border border-[#141f38]">
                <h3 className="text-sm uppercase tracking-wider text-[#a3aac4] font-semibold mb-3 flex items-center"><Info className="w-4 h-4 mr-2"/> Detailed Reasoning</h3>
                <div className="relative">
                  <p className={`text-[#dee5ff] leading-relaxed ${reasoningExpanded ? '' : 'line-clamp-3'}`}>
                    {data.analysis.reasoning}
                  </p>
                  <Button 
                    variant="ghost" 
                    onClick={() => setReasoningExpanded(!reasoningExpanded)}
                    className="mt-2 text-[#6bff8f] hover:text-[#5bf083] hover:bg-[#141f38] px-0"
                  >
                    {reasoningExpanded ? 'Show Less' : 'Read Full Analysis'}
                  </Button>
                </div>
              </div>

              {data.analysis.red_flags.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#ff7351] font-semibold mb-3 flex items-center"><AlertTriangle className="w-4 h-4 mr-2"/> Red Flags</h3>
                  <ul className="space-y-2">
                    {data.analysis.red_flags.map((flag, i) => (
                      <li key={i} className="flex items-start bg-[#ff7351]/10 rounded-xl p-3 border border-[#ff7351]/20">
                        <ThumbsDown className="w-5 h-5 text-[#ff7351] mr-3 shrink-0 mt-0.5" />
                        <span className="text-[#dee5ff]">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.analysis.supporting_points.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#6bff8f] font-semibold mb-3 flex items-center"><ThumbsUp className="w-4 h-4 mr-2"/> Supporting Points</h3>
                  <ul className="space-y-2">
                    {data.analysis.supporting_points.map((point, i) => (
                      <li key={i} className="flex items-start bg-[#6bff8f]/10 rounded-xl p-3 border border-[#6bff8f]/20">
                        <Check className="w-5 h-5 text-[#6bff8f] mr-3 shrink-0 mt-0.5" />
                        <span className="text-[#dee5ff]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </CardContent>
          </Card>

          {/* 3. ARTICLES */}
          {data.articles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-['Manrope'] text-[#dee5ff] px-2 flex items-center mt-8">
                 Cross-Referenced Sources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.articles.map((article, i) => (
                  <a href={article.url} target="_blank" rel="noopener noreferrer" key={i} className="block group">
                    <Card className="h-full rounded-2xl bg-[#091328] border border-[#141f38] hover:border-[#4d556b] transition-all hover:-translate-y-1 hover:shadow-lg">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#a3aac4]">{article.source}</span>
                          {article.published_at && (
                            <span className="text-xs text-[#4d556b]">{new Date(article.published_at).toLocaleDateString()}</span>
                          )}
                        </div>
                        <h4 className="text-[#dee5ff] font-medium leading-snug mb-3 group-hover:text-[#6bff8f] transition-colors">{article.title}</h4>
                        <p className="text-[#8a94b5] text-sm line-clamp-2 mt-auto">{article.description}</p>
                        <div className="mt-4 flex items-center text-sm font-medium text-[#4d556b] group-hover:text-[#6bff8f]">
                          Read full article <ExternalLink className="w-3 h-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - CLAIM BREAKDOWN */}
        <div className="space-y-6">
          <Card className="rounded-3xl bg-[#0f1930] border border-[#141f38] sticky top-24">
            <CardHeader>
              <CardTitle className="font-['Manrope'] text-xl text-[#dee5ff]">Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <span className="text-xs uppercase tracking-wider text-[#a3aac4] font-semibold block mb-2">Analyzed Claim</span>
                <p className="text-[#dee5ff] text-lg font-medium border-l-2 border-[#4d556b] pl-3 py-1">"{data.extracted.main_claim}"</p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#a3aac4] font-semibold block mb-2">Key Entities</span>
                <div className="flex flex-wrap gap-2">
                  {data.extracted.entities.map(ent => (
                    <Badge key={ent} variant="secondary" className="bg-[#192540] text-[#dee5ff] hover:bg-[#4d556b] rounded-lg tracking-wide">{ent}</Badge>
                  ))}
                  {data.extracted.entities.length === 0 && <span className="text-sm text-[#4d556b]">None identified</span>}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#a3aac4] font-semibold block mb-2">Topics & Keywords</span>
                <div className="flex flex-wrap gap-2">
                  {data.extracted.keywords.map(kw => (
                    <Badge key={kw} variant="outline" className="border-[#4d556b] text-[#a3aac4] rounded-lg">{kw}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#141f38]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#a3aac4] font-semibold">Suggested Search</span>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-6 px-2 text-[#a3aac4] hover:text-[#dee5ff]">
                    {copied ? <Check className="w-3 h-3 mr-1 text-[#6bff8f]"/> : <Copy className="w-3 h-3 mr-1"/>}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
                <code className="block w-full bg-[#060e20] rounded-xl p-3 text-sm text-[#4d556b] border border-[#141f38] break-words">
                  {data.extracted.search_query}
                </code>
              </div>

              <div className="flex justify-between text-sm py-2">
                <span className="text-[#a3aac4]">Claim Type</span>
                <span className="text-[#dee5ff] font-medium">{data.extracted.claim_type}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-[#a3aac4]">Source Quality</span>
                <span className="text-[#dee5ff] font-medium">{data.analysis.source_quality}</span>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

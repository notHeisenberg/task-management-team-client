import { ScrollRestoration } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Import ShadCN components
import FaqData from "./FaqData";

const Faq = () => {
    return (
        <div id='faq' className="section flex flex-col lg:flex-row mt-32 mb-10 mx-[6%] justify-between text-white">
            <ScrollRestoration />
            <div className="w-full lg:w-[50%] mb-8 lg:mb-0">
                <h4 className="text-[#0095ff] text-xl pb-8 font-medium">QUESTIONS & ANSWERS</h4>
                <h1 className="text-4xl md:text-5xl pb-4 font-semibold">
                    Frequently <span className="bg-pink-500 px-3 rounded-tr-3xl">asked</span>
                </h1>
                <h1 className="text-4xl md:text-5xl font-semibold">Questions</h1>
                <p className="pt-12 font-bold text-xl">Don't get Answer?</p>
                <p className="pt-2 text-[#0095ff] font-medium">Leave us a Message on support chat.</p>
                <p className="pt-2 font-medium">We will answer you in less than 2 Hours!!</p>
            </div>
            <div className="w-full lg:w-[50%]">
                <Accordion type="single" collapsible>
                    {FaqData.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="">{faq.answer}</div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Faq;

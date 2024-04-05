import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Amazon, EatingWell, FoodWine, FoodNetwork, Forbes, MensHealth, NewYorkTimes } from "../comps/icons";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../components/ui/carousel"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable"

export default function Home() {

    return (
        <div className="w-full">
            <div className=" bkg">
                <div className='hero-pic'>
                    <img src="/images/cooknookwok.png" alt="" />
                    <h1 className="hero-text">From Kitchen to Table: Where Every Recipe Tells a Story.</h1>
                </div>
            </div>

            <div className="mt-2">
                <Card className='company-bkg'>
                    <CardTitle> Featured On: </CardTitle>
                    <CardContent className='companies'>
                        <FoodNetwork />
                        <Amazon />
                        <EatingWell />
                        <Forbes />
                        <MensHealth />
                    </CardContent>
                </Card>
            </div>
            <div className="w-full">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[400px]  rounded-lg border"
                >
                    <ResizablePanel defaultSize={25} style={{ backgroundImage: 'url(images/femalechef.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Whether You Are A Professional Chef</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75} style={{ backgroundImage: 'url(images/dadcooking.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Or A Professional At Home</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            
        </div>
    )
}

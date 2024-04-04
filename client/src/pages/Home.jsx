import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Amazon, EatingWell, FoodWine, FoodNetwork, Forbes, MensHealth, NewYorkTimes } from "../comps/icons";

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
                <Card>
                    <CardDescription> Featured On: </CardDescription>
                    <CardContent className='companies'>
                        <FoodNetwork />
                        <Amazon />
                        <EatingWell />
                        <Forbes />
                        <MensHealth />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

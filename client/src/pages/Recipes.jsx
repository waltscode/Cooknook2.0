import Categories from '../comps/checkbox.jsx';
import PushCards from "../comps/push-cards";

export default function Recipes() {

    return (
        <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
            <Categories />
        </div>
        <div className="col-span-5">
            <PushCards />
        </div>
    </div>
    )
}

import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";

const Startup = ({ }: any) => {
    return (
        <main className="h-full max-h-full overflow-y-auto">
            <section>
                <Header />
            </section>
            <aside className="w-full h-full flex items-start justify-start">
                <Sidebar type={KanzRoles.STARTUP} />
                <section className="bg-cbc-auth pt-[5rem] h-full" style={{width: "calc(100% - 250px)"}}></section>
            </aside>
        </main>
    );
};
export default Startup;
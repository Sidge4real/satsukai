import { ITeam } from "../../types/ITeam";
  
  interface ITeamSection{
    members : ITeam[]
  }

  export default function Team({members} : ITeamSection) {
    return (
      <section className="bg-white py-24 sm:py-32 px-20">
        <h2 className='text-center text-2xl font-bold text-gray-500 mb-4'>Our team</h2>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2">
          {members.map((person) => (
            <li key={person.id}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.attributes.profile.data.attributes.url} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.attributes.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-green-500">{person.attributes.function}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  
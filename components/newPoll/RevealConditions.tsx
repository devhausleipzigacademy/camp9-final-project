import Radio from "components/Radiobutton";

export default function RevealConditions() {
  return (
    <>
      <div>RevealConditions</div>
      <div className="flex justify-between" >
        <p className="w-[240px] row"><strong>Reveal usernames</strong> for options with agreement of at least:</p>
        <Radio variant={"secondary"}>Reveal</Radio>
      </div>
      <div className="flex">
      <img src="https://i.ibb.co/BLM88Ys/revealbar.png" className="mt-4 w-[356px]" />
      </div>
      <div className="flex justify-between mt-6" >
        <p className="w-[240px] row"><strong>Always reveal usernames</strong> (fully open)</p>
        <Radio variant={"secondary"}>Reveal</Radio>
      </div>
      <div className="flex justify-between mt-4" >
        <p className="w-[240px] row"><strong>Never reveal usernames</strong> (fully anonymous)</p>
        <Radio variant={"secondary"}>Reveal</Radio>
      </div>
    </>
  );
}

import { ButtonItem, ConfirmModal, PanelSection, TextField, showModal } from "@decky/ui";
import { FC, useState } from "react";
import { FaPen } from "react-icons/fa";
import { GameInfo } from "../../util/state";
import { normalizeGameName } from "../../util/backend";
import DeckyStoreButton from "../other/DeckyStoreButton";

const AliasConfigurator: FC<{ alias: string; onChange: (alias: string) => void }> = ({ alias, onChange }) => {
  const [str, setStr] = useState(alias);

  return (
    // This bit of code is a bit rushed, make this prettier in a later version.
    <PanelSection>
      <TextField value={str} onChange={(e) => setStr(e.target.value)} onBlur={() => onChange(str)} />
    </PanelSection>
  );
};

const NormalizeAlias = function(alias: string, onChange: Function){

      console.log("Normalizing alias: 21");

      let localAlias = alias;

      localAlias += "-25";

      (async () => {
        console.log("Normalizing alias: 28");

        localAlias+= "-30";

        //onChange(localAlias);
        return await normalizeGameName(alias);
      })().then((result) => {
        console.log("Normalizing alias: 37");

        localAlias += "-37";        
        localAlias += "-"+ result.toString();
        onChange(localAlias);
      });
      // if(!result && !result.toLowerCase().startsWith("no info for these games:")){
      //   onChange(result);
      // }
}

const ConfigureAliasesModal: FC<{ game: GameInfo; closeModal?: () => void; onOK: (alias: string) => void; onMiddleButton: (alias: string) => void }> = ({ game, closeModal, onOK, onMiddleButton }) => {
  const [alias, setAliases] = useState(game.alias);

  return (
    <ConfirmModal strTitle="Configure Game Alias" onOK={() => onOK(alias)} closeModal={closeModal} strMiddleButtonText="Replace with manifest" onMiddleButton={() => onMiddleButton(alias)}>
      <PanelSection>
        <div>
          Sometimes the title of the game in Ludusavi will not match the one on Steam. For Example the game <b>TUNIC</b> on Steam will be called <b>Tunic</b> in
          Ludusavi. Change the name below match settings in Ludusavi. Jason 123321
        </div>
        <div>
          Configuring an alias for the game <b>{game.name}</b>.
        </div>
      </PanelSection>
      <AliasConfigurator alias={alias} onChange={setAliases} />
    </ConfirmModal>
  );
};

export const ConfigureAliasesButton: FC<{ game: GameInfo; onChange: (alias: string) => void }> = ({ game, onChange }) => {
  return (
    <ButtonItem layout="below" onClick={() => showModal(<ConfigureAliasesModal game={game} onOK={onChange} onMiddleButton={(e) => { (NormalizeAlias(e, onChange))}}/>)}>
      <DeckyStoreButton icon={<FaPen />}>Set Custom Game Alias</DeckyStoreButton>
    </ButtonItem>
  );
};

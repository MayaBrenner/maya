/* Public surface for the UX-decision specimens — these are the components
   case-study .mdx files reference by name. */

import ContextBoard from "./ContextBoard";
import UserJourney from "./UserJourney";
import { HA_CFG, MB_CFG, CD_CFG, ID_CFG } from "./configs";
import { HA_JOURNEY } from "./journeys/homeAgain";
import { MB_JOURNEY } from "./journeys/scout";
import { CD_JOURNEY } from "./journeys/cardb";
import { ID_JOURNEY } from "./journeys/iDo";

export { HASellerStrip, HAStatus, HAHandoff } from "./HomeAgain";
export { ScoutPrivacy, ScoutType, ScoutButton } from "./Scout";
export { CDSpecs, CDReasons, CDExpert } from "./CarDB";
export { IDOWorkspace, IDOSeating, IDOType } from "./IDo";

export const HAContext = () => <ContextBoard cfg={HA_CFG} />;
export const MBContext = () => <ContextBoard cfg={MB_CFG} />;
export const CDContext = () => <ContextBoard cfg={CD_CFG} />;
export const IDContext = () => <ContextBoard cfg={ID_CFG} />;

export const HAJourney = () => <UserJourney cfg={HA_JOURNEY} />;
export const MBJourney = () => <UserJourney cfg={MB_JOURNEY} />;
export const CDJourney = () => <UserJourney cfg={CD_JOURNEY} />;
export const IDJourney = () => <UserJourney cfg={ID_JOURNEY} />;

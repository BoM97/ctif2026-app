import type { BusConnection } from "../types";
export const BUS_STOPS_ORDER = ["Tyršův stadion","School 3","School 4","School 1","School 2","Tyršův stadion Arrival"];
export const BUS_CONNECTIONS: BusConnection[] = [
  { id: "tue-wed-out", dateRange: "Tue & Wed 14.–15.07.", direction: "Schools → Stadium",
    stops: [{name:"School 1",time:"07:30"},{name:"School 2",time:"07:35"},{name:"School 3",time:"07:40"},{name:"School 4",time:"07:45"},{name:"Tyršův stadion Arrival",time:"08:00"}] },
  { id: "thu-out", dateRange: "Thu 16.07.", direction: "Schools → Stadium (Championship)",
    stops: [{name:"School 1",time:"06:45"},{name:"School 2",time:"06:50"},{name:"School 3",time:"06:55"},{name:"School 4",time:"07:00"},{name:"Tyršův stadion Arrival",time:"07:20"}] }
];

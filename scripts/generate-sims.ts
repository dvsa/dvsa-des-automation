// @ts-ignore
import { Simctl } from 'node-simctl';

const simulatorModel = 'iPad (9th generation)';

export const createSimulator = async (model: string, num?: number) => {
  const simctl = new Simctl();
  const name = `${model} Automation ${num}`;
  simctl.udid = await simctl.createDevice(name, model, '16.2');
  console.log(`${model} Automation ${num} created`);
};

export const createSimulators = async (numberOfSims: number) => {
  for (let i = 0; i < numberOfSims; i += 1) {
    await createSimulator(simulatorModel, i);
  }
};

export const getAutomationSimulatorUDIDS = async (): Promise<string[]> => {
  const udids: string[] = [];
  const simctl = new Simctl();
  const devices: any[] = await simctl.getDevices();
  const runtimes = Object.keys(devices) as string[];
  runtimes.forEach((runtime) => {
    devices[runtime].forEach((simulator: any) => {
      if (simulator.name.indexOf('Automation') >= 0) {
        udids.push(simulator.udid);
      }
    });
  });
  return udids;
};

export const deleteDeviceByUDID = async (udid: string) => {
  const simctl = new Simctl();
  simctl.udid = udid;
  simctl.udid = await simctl.deleteDevice();
  console.log(`deleted device ${udid}`);
};

export const deleteAllAutomationSimulators = async () => {
  const simulators: string[] = await getAutomationSimulatorUDIDS();
  // eslint-disable-next-line no-restricted-syntax
  for (const simulator of simulators) {
    await deleteDeviceByUDID(simulator);
  }
};

export const createAutomationSimulators = async (numberOfSimulators: number) => {
  // await deleteAllAutomationSimulators();
  const sims: string[] = await getAutomationSimulatorUDIDS();
  // if not enough existing automation simulators, create required additional sims
  if (sims.length < numberOfSimulators) {
    console.log(`${numberOfSimulators} simulators requested but only ${sims.length} simulators found...creating additional simulators`);
    await createSimulators(numberOfSimulators - sims.length);
  }
};

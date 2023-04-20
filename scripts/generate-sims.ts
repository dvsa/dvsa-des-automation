// @ts-ignore
import { Simctl } from 'node-simctl';
import { DeviceName, IOSVersion } from '../src/enums/device-type.enum';

export const createSimulator = async (model: DeviceName, iosVersion: IOSVersion, num?: number) => {
  const simctl = new Simctl();
  const name = `${model} ${iosVersion} Automation ${num}`;
  simctl.udid = await simctl.createDevice(name, model, iosVersion);
  console.log(`${model} Automation ${num} created`);
};

export const createSimulators = async (numberOfSims: number, simulatorModel: DeviceName, iosVersion: IOSVersion) => {
  for (let i = 0; i < numberOfSims; i += 1) {
    await createSimulator(simulatorModel, iosVersion, i);
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
  const promiseArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const simulator of simulators) {
    promiseArray.push(deleteDeviceByUDID(simulator));
  }
  await Promise.all(promiseArray);
};

export const createAutomationSimulators = async (numberOfSimulators: number, simulatorModel: DeviceName, iosVersion: IOSVersion) => {
  const sims: string[] = await getAutomationSimulatorUDIDS();
  // if not enough existing automation simulators, create required additional sims
  if (sims.length < numberOfSimulators) {
    console.log(`${numberOfSimulators} simulators requested but only ${sims.length} simulators found...creating additional simulators`);
    await createSimulators(numberOfSimulators - sims.length, simulatorModel, iosVersion);
  }
};

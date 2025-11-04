# RoboVM Robotics Layer

ROS2-based robot control and blockchain integration for autonomous robots.

## Overview

The robotics layer consists of ROS2 packages that enable robots to:

* Publish status and telemetry
* Listen to blockchain events
* Accept and execute tasks
* Upload results to IPFS
* Communicate with smart contracts

## Packages

### robot_agent

Main robot node that handles:
* Status publishing (`/robot/status`)
* Command listening (`/robot/cmd`)
* Heartbeat mechanism
* Basic task execution

### task_listener

Blockchain integration module:
* Listens to smart contract events
* Filters and evaluates tasks
* Accepts tasks via web3 transactions
* Submits results with IPFS CID

### navigation

Autonomous navigation module:
* Path planning
* Waypoint following
* Obstacle avoidance
* Area scanning/mapping

## Setup

> ⚠️ **Work in Progress**: Installation and setup instructions are currently being developed.

### Prerequisites

* ROS2 Humble
* Python 3.10+
* web3.py
* ipfshttpclient
* Gazebo Classic or Gazebo

### Installation

```bash
cd robot
colcon build
source install/setup.bash
```

### Configuration

Create a `config/robot_config.yaml` file:

```yaml
robot:
  id: "robot_001"
  type: "rover"
  blockchain:
    rpc_url: "https://bsc-dataseed.binance.org/"
    contract_address: "0x..."
    private_key_env: "ROBOT_PRIVATE_KEY"
  ipfs:
    host: "127.0.0.1"
    port: 5001
```

### Running

```bash
ros2 run robot_agent robot_node
ros2 run task_listener task_listener_node
```

## Topics

### Published Topics

* `/robot/status` - Robot status (battery, position, state)
* `/robot/telemetry` - Telemetry data (sensors, actuators)
* `/robot/task_status` - Current task execution status

### Subscribed Topics

* `/robot/cmd` - Commands for robot control
* `/robot/task` - Task assignments from blockchain

## Services

* `/robot/get_status` - Get current robot status
* `/robot/execute_task` - Execute a specific task
* `/robot/upload_result` - Upload task result to IPFS

## IPFS Integration

Task results are uploaded to IPFS and referenced by CID in smart contracts.

## Blockchain Integration

The robot connects to Binance Smart Chain (BSC) via web3.py:
* Event listening for new tasks
* Transaction signing for task acceptance
* Result submission with IPFS CID

## Development

### Building

```bash
colcon build --packages-select robot_agent task_listener
```

### Testing

```bash
colcon test --packages-select robot_agent
```

## Simulation

Use Gazebo for robot simulation:

```bash
ros2 launch robot_agent simulation.launch.py
```

## Links

* [RoboVM Website](https://robovm.space)
* [Documentation](https://docs.robovm.space)
* [X (Twitter)](https://x.com/robo_vm)


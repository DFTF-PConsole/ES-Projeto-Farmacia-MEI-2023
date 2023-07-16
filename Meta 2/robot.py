import time
import json
import boto3

# AWS Step Functions configuration
stepfunctions_client = boto3.client('stepfunctions', region_name='us-east-1')
state_machine_arn = 'arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine'

def simulate_robot():
    while True:
        # Wait for a new state from Step Function
        response = stepfunctions_client.get_activity_task(
            activityArn='arn:aws:states:us-east-1:123456789012:activity:MyActivity',
            workerName='MyRobot'
        )
        
        if 'taskToken' in response:
            task_token = response['taskToken']
            state_input = json.loads(response['input'])
            
            # Perform action (simulate picking up drugs)
            print('Robot is picking up drugs...')
            time.sleep(5)  # Simulate the time it takes to pick up the drugs
            
            # Send confirmation back to Step Function
            confirmation = {
                'message': 'Drugs picked up successfully'
            }
            
            
            
            print('Confirmation sent to Step Function')
            
            # Wait for human confirmation
            print('Waiting for human confirmation...')
            while True:
                time.sleep(1)
                
                # Check if human confirmation is received
                confirmation = input('Please enter confirmation (Y/N): ')
                if confirmation.lower() == 'y':
                    break

            stepfunctions_client.send_task_success(
                taskToken=task_token,
                output=json.dumps(confirmation)
            )
            
            # Send next state to Step Function
            next_state = {
                'message': 'Ready for next activity'
            }
            
            stepfunctions_client.send_task_heartbeat(
                taskToken=task_token,
                output=json.dumps(next_state)
            )
            
            print('Next state sent to Step Function')
        
        # Sleep for a while before checking for new state again
        time.sleep(1)

# Start the robot simulation
simulate_robot()

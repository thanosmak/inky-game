/**
 * TriggerVolume - Placeholder for trigger zones
 * Will detect when player enters/exits to trigger story events
 */

interface TriggerVolumeProps {
  position?: [number, number, number]
  size?: [number, number, number]
  onEnter?: () => void
  onExit?: () => void
}

export function TriggerVolume(_props: TriggerVolumeProps) {
  // Future: Add invisible box, collision detection, callbacks
  return null
}


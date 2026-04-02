'use client'

/**
 * ZMUX Design System - Readability Toggle
 * 
 * Accessibility controls for font, spacing, and contrast
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Readability options
 * @invariant INVARIANT_A11Y - Full customization for diverse needs
 */

import * as React from 'react'
import { Type, Minus, Plus, Eye, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/glass/GlassCard'

export interface ReadabilitySettings {
  fontSize: 'normal' | 'large' | 'x-large'
  dyslexiaFont: boolean
  highContrast: boolean
  lineSpacing: 'normal' | 'relaxed' | 'loose'
  reducedMotion: boolean
}

export interface ReadabilityToggleProps {
  className?: string
  settings?: ReadabilitySettings
  onChange?: (settings: ReadabilitySettings) => void
  variant?: 'compact' | 'full'
}

const defaultSettings: ReadabilitySettings = {
  fontSize: 'normal',
  dyslexiaFont: false,
  highContrast: false,
  lineSpacing: 'normal',
  reducedMotion: false,
}

const fontSizeLabels = {
  normal: 'A',
  large: 'A+',
  'x-large': 'A++',
}

const lineSpacingLabels = {
  normal: 'Normal',
  relaxed: 'Relaxed',
  loose: 'Loose',
}

export function ReadabilityToggle({
  className,
  settings: controlledSettings,
  onChange,
  variant = 'full',
}: ReadabilityToggleProps) {
  const [localSettings, setLocalSettings] = React.useState<ReadabilitySettings>(defaultSettings)
  
  const settings = controlledSettings ?? localSettings
  
  const updateSetting = <K extends keyof ReadabilitySettings>(
    key: K,
    value: ReadabilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value }
    if (onChange) {
      onChange(newSettings)
    } else {
      setLocalSettings(newSettings)
    }
  }

  const cycleFontSize = () => {
    const sizes: ReadabilitySettings['fontSize'][] = ['normal', 'large', 'x-large']
    const currentIndex = sizes.indexOf(settings.fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    updateSetting('fontSize', sizes[nextIndex])
  }

  const cycleLineSpacing = () => {
    const spacings: ReadabilitySettings['lineSpacing'][] = ['normal', 'relaxed', 'loose']
    const currentIndex = spacings.indexOf(settings.lineSpacing)
    const nextIndex = (currentIndex + 1) % spacings.length
    updateSetting('lineSpacing', spacings[nextIndex])
  }

  const resetAll = () => {
    if (onChange) {
      onChange(defaultSettings)
    } else {
      setLocalSettings(defaultSettings)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={cycleFontSize}
          aria-label={`Font size: ${settings.fontSize}`}
          className="font-mono"
        >
          {fontSizeLabels[settings.fontSize]}
        </Button>
        <Button
          variant={settings.dyslexiaFont ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateSetting('dyslexiaFont', !settings.dyslexiaFont)}
          aria-label={`Dyslexia-friendly font: ${settings.dyslexiaFont ? 'on' : 'off'}`}
          aria-pressed={settings.dyslexiaFont}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          variant={settings.highContrast ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateSetting('highContrast', !settings.highContrast)}
          aria-label={`High contrast: ${settings.highContrast ? 'on' : 'off'}`}
          aria-pressed={settings.highContrast}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <GlassCard className={cn('max-w-sm', className)}>
      <GlassCardHeader className="flex-row items-center justify-between pb-4">
        <GlassCardTitle className="text-base">Reading Preferences</GlassCardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="h-8 px-2"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        {/* Font Size */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Text Size</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const sizes: ReadabilitySettings['fontSize'][] = ['normal', 'large', 'x-large']
                const currentIndex = sizes.indexOf(settings.fontSize)
                if (currentIndex > 0) {
                  updateSetting('fontSize', sizes[currentIndex - 1])
                }
              }}
              disabled={settings.fontSize === 'normal'}
              aria-label="Decrease text size"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="flex-1 text-center text-sm font-medium">
              {settings.fontSize === 'normal' && 'Normal'}
              {settings.fontSize === 'large' && 'Large'}
              {settings.fontSize === 'x-large' && 'Extra Large'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const sizes: ReadabilitySettings['fontSize'][] = ['normal', 'large', 'x-large']
                const currentIndex = sizes.indexOf(settings.fontSize)
                if (currentIndex < sizes.length - 1) {
                  updateSetting('fontSize', sizes[currentIndex + 1])
                }
              }}
              disabled={settings.fontSize === 'x-large'}
              aria-label="Increase text size"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Line Spacing */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Line Spacing</Label>
          <div className="flex gap-2">
            {(['normal', 'relaxed', 'loose'] as const).map((spacing) => (
              <Button
                key={spacing}
                variant={settings.lineSpacing === spacing ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => updateSetting('lineSpacing', spacing)}
              >
                {lineSpacingLabels[spacing]}
              </Button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dyslexia-font" className="text-sm font-medium">
                Dyslexia-friendly font
              </Label>
              <p className="text-xs text-muted-foreground">
                Uses OpenDyslexic font
              </p>
            </div>
            <Switch
              id="dyslexia-font"
              checked={settings.dyslexiaFont}
              onCheckedChange={(checked) => updateSetting('dyslexiaFont', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="text-sm font-medium">
                High contrast
              </Label>
              <p className="text-xs text-muted-foreground">
                Maximum readability
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting('highContrast', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduced-motion" className="text-sm font-medium">
                Reduce motion
              </Label>
              <p className="text-xs text-muted-foreground">
                Disable animations
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
            />
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

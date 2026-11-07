"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { fullDayMsgs } from "@/lib/i18n/messages/full-day";
import {
  moveWidget,
  toggleWidget,
  type TodayLayout,
  type TodayWidgetId,
} from "@/lib/today-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

/**
 * The edit mode of Full day Today (design/today-widgets.md): one row per
 * card, with a show/hide switch and move buttons. Each change saves at once.
 */
export function TodayLayoutEditor({
  layout,
  names,
  onChange,
  onReset,
  onDone,
}: {
  layout: TodayLayout;
  names: Record<TodayWidgetId, { title: string; body: string; icon: string }>;
  onChange: (layout: TodayLayout) => void;
  onReset: () => void;
  onDone: () => void;
}) {
  const t = useMsgs(fullDayMsgs);
  return (
    <Card className="border-primary/50">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-base font-semibold">{t.customizeTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.customizeHint}</p>
          </div>
          <Button size="sm" onClick={onDone}>
            {t.customizeDone}
          </Button>
        </div>
        <ol className="divide-y rounded-xl border">
          {layout.order.map((id, i) => {
            const card = names[id];
            const shown = !layout.hidden.includes(id);
            return (
              <li key={id} className="flex items-center gap-3 px-3 py-2.5">
                <span aria-hidden="true" className="text-lg leading-none">
                  {card.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={shown ? "block text-sm font-medium" : "block text-sm font-medium text-muted-foreground line-through"}>
                    {card.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{card.body}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === 0}
                    aria-label={fmt(t.moveUp, { card: card.title })}
                    onClick={() => onChange(moveWidget(layout, id, -1))}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={i === layout.order.length - 1}
                    aria-label={fmt(t.moveDown, { card: card.title })}
                    onClick={() => onChange(moveWidget(layout, id, 1))}
                  >
                    <ArrowDown />
                  </Button>
                  <Switch
                    className="ml-2"
                    checked={shown}
                    aria-label={fmt(t.showCard, { card: card.title })}
                    onCheckedChange={() => onChange(toggleWidget(layout, id))}
                  />
                </span>
              </li>
            );
          })}
        </ol>
        <Button variant="outline" size="sm" onClick={onReset}>
          {t.customizeReset}
        </Button>
      </CardContent>
    </Card>
  );
}

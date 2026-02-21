<?php

namespace App\Filament\Resources\Orders\Pages;

use App\Filament\Resources\Orders\OrderResource;
use App\Mail\OrderStatusChanged;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Mail;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected ?string $originalStatus = null;

    protected function beforeSave(): void
    {
        $this->originalStatus = $this->getRecord()->getOriginal('status');
    }

    protected function afterSave(): void
    {
        $record = $this->getRecord();

        if ($this->originalStatus !== null && $this->originalStatus !== $record->status) {
            $record->load('user', 'items');
            Mail::to($record->user->email)
                ->send(new OrderStatusChanged($record, $this->originalStatus));
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}

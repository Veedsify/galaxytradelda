<?php

namespace App\Filament\Resources\Contacts\Pages;

use App\Filament\Resources\Contacts\ContactResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\ViewRecord;

class ViewContact extends ViewRecord
{
    protected static string $resource = ContactResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('mark_read')
                ->label('Mark as Read')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->visible(fn() => $this->getRecord()->read_at === null)
                ->action(function () {
                    $this->getRecord()->markAsRead();
                    $this->refreshFormData(['read_at']);
                }),
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * App\Models\Event
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon $start_datetime
 * @property \Illuminate\Support\Carbon|null $end_datetime
 * @property string|null $image
 * @property string|null $video_link
 * @property string|null $web_link
 * @property string $category
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read string $duration_text
 * @property-read int $duration_hours
 * @property-read string $time_period
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereEndDatetime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereStartDatetime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereVideoLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereWebLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event filterByDate($date)
 * @method static \Illuminate\Database\Eloquent\Builder|Event filterByCategory($category)
 * @method static \Database\Factories\EventFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'start_datetime',
        'end_datetime',
        'image',
        'video_link',
        'web_link',
        'category',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
    ];

    /**
     * Get the duration of the event in text format.
     *
     * @return string
     */
    public function getDurationTextAttribute(): string
    {
        if (!$this->end_datetime) {
            return 'Durasi tidak ditentukan';
        }

        $diff = $this->start_datetime->diff($this->end_datetime);
        $parts = [];

        if ($diff->d > 0) {
            $parts[] = $diff->d . ' hari';
        }
        if ($diff->h > 0) {
            $parts[] = $diff->h . ' jam';
        }
        if ($diff->i > 0) {
            $parts[] = $diff->i . ' menit';
        }

        return empty($parts) ? '0 menit' : implode(' ', $parts);
    }

    /**
     * Get the duration of the event in hours.
     *
     * @return int
     */
    public function getDurationHoursAttribute(): int
    {
        if (!$this->end_datetime) {
            return 0;
        }

        return (int) $this->start_datetime->diffInHours($this->end_datetime);
    }

    /**
     * Get the time period of the event (pagi, siang, sore, malam).
     *
     * @return string
     */
    public function getTimePeriodAttribute(): string
    {
        $hour = $this->start_datetime->hour;

        if ($hour >= 5 && $hour < 12) {
            return 'Pagi';
        } elseif ($hour >= 12 && $hour < 15) {
            return 'Siang';
        } elseif ($hour >= 15 && $hour < 18) {
            return 'Sore';
        } else {
            return 'Malam';
        }
    }

    /**
     * Scope a query to filter by date.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $date
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByDate($query, $date)
    {
        if ($date) {
            return $query->whereDate('start_datetime', $date);
        }
        return $query;
    }

    /**
     * Scope a query to filter by category.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByCategory($query, $category)
    {
        if ($category) {
            return $query->where('category', $category);
        }
        return $query;
    }
}